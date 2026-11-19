import { StateGraph, START, END } from '@langchain/langgraph';
import { checkpointer } from './checkpointer.js';
import { InterviewState, defaultState, topicBanks, getTopicsForSession } from './state.js';
import { questionGenerator } from './nodes/questionGenerator.js';
import { answerEvaluator } from './nodes/answerEvaluator.js';
import { followUpRouter } from './nodes/followUpRouter.js';
import { difficultyAdjuster } from './nodes/difficultyAdjuster.js';
import { closingNode } from './nodes/closingNode.js';

/**
 * setProbeInstruction — calibrated for candidate experience level.
 * When a fresher struggles or gives a vague answer, provide supportive scaffolding
 * rather than aggressive interrogation into low-level internals.
 */
const setProbeInstruction = async (state) => {
  if (!state.nextInstruction?.startsWith('SURPRISE_CALLBACK')) {
    const exp = (state.candidateProfile?.experienceLevel || 'mid').toLowerCase();
    const isFresher = exp === 'student' || exp === 'junior';

    if (isFresher) {
      return {
        nextInstruction: `The candidate is a student/fresher and their response was ${state.lastAnswerQuality}. Ask a supportive, guided follow-up on "${state.currentTopic}". Give a gentle hint, simple real-world analogy, or ask a guiding sub-question to help them structure their answer. DO NOT ask them to implement data structures from scratch, calculate memory resize overhead, or dive into compiler internals.`,
      };
    }

    return {
      nextInstruction: `The candidate's answer was ${state.lastAnswerQuality}. Ask a follow-up that probes deeper on "${state.currentTopic}". Don't move to a new topic yet.`,
    };
  }
  return {};
};

// ── Real StateGraph wiring — mirrors the exact sequence the manual orchestrator ran ──
//   answerEvaluator -> followUpRouter -> probe:   setProbeInstruction -> questionGenerator
//                                      -> advance: difficultyAdjuster -> (shouldClose ? closingNode : questionGenerator)
//                                      -> close:   closingNode
const builder = new StateGraph(InterviewState)
  .addNode('answerEvaluator', answerEvaluator)
  .addNode('setProbeInstruction', setProbeInstruction)
  .addNode('questionGenerator', questionGenerator)
  .addNode('difficultyAdjuster', difficultyAdjuster)
  .addNode('closingNode', closingNode)
  .addEdge(START, 'answerEvaluator')
  .addConditionalEdges('answerEvaluator', followUpRouter, {
    probe: 'setProbeInstruction',
    advance: 'difficultyAdjuster',
    close: 'closingNode',
  })
  .addEdge('setProbeInstruction', 'questionGenerator')
  .addConditionalEdges(
    'difficultyAdjuster',
    (state) => (state.shouldClose ? 'close' : 'continue'),
    { close: 'closingNode', continue: 'questionGenerator' }
  )
  .addEdge('questionGenerator', END)
  .addEdge('closingNode', END);

const compiledGraph = builder.compile();
// No LangGraph-managed checkpointer here on purpose — your existing checkpointer.js
// already persists the full business state as JSON per sessionId, which the wrapper
// below loads/saves explicitly around each invoke(). Mixing that with LangGraph's own
// binary checkpoint format would be a needless second source of truth.

export const interviewGraph = {
  async initializeState(sessionId, { interviewType, candidateProfile }) {
    const bank = getTopicsForSession({ interviewType, jobRole: candidateProfile?.jobRole });
    const firstTopic = bank[0];

    const exp = (candidateProfile?.experienceLevel || 'mid').toLowerCase();
    const initialDifficulty = (exp === 'student' || exp === 'junior') ? 1 : (exp === 'senior' || exp === 'lead' || exp === 'principal') ? 3 : 2;

    const initialState = {
      ...defaultState,
      sessionId: String(sessionId),
      interviewType,
      candidateProfile,
      currentTopic: firstTopic,
      difficultyLevel: initialDifficulty,
      startedAt: new Date().toISOString(),
    };

    await checkpointer.save(String(sessionId), initialState);
    return initialState;
  },

  async processCandidateTurn(sessionId, incomingTranscript, { skipTurnCount = false } = {}) {
    const threadId = String(sessionId);
    let state = await checkpointer.load(threadId);

    if (state?.shouldClose) {
      const lastAiTurn = [...state.transcript].reverse().find((t) => t.speaker === 'ai');
      return {
        content: lastAiTurn?.content ?? 'Thank you for your time today, goodbye.',
        shouldClose: true,
        state,
      };
    }

    if (!state) {
      throw new Error(`No graph state found for session ${sessionId}. Was it initialized?`);
    }

    const incomingCandidateTurns = incomingTranscript.filter((t) => t.speaker === 'candidate');
    const savedCandidateTurns = state.transcript.filter((t) => t.speaker === 'candidate');
    const lastIncomingCandidate = incomingCandidateTurns[incomingCandidateTurns.length - 1];
    const lastSavedAi = [...state.transcript].reverse().find((t) => t.speaker === 'ai');

    if (
      lastIncomingCandidate &&
      lastSavedAi &&
      state.transcript.length > incomingTranscript.length &&
      savedCandidateTurns.length === incomingCandidateTurns.length &&
      savedCandidateTurns[savedCandidateTurns.length - 1]?.content === lastIncomingCandidate.content
    ) {
      console.log(`[graph] Idempotent hit: reusing existing AI response for session ${sessionId}`);
      return { content: lastSavedAi.content, shouldClose: state.shouldClose, state };
    }

    const realTurnCount = skipTurnCount ? state.turnCount : incomingCandidateTurns.length;
    if (skipTurnCount) {
      console.log(
        `[graph] sessionId=${sessionId} — skipTurnCount active, turnCount stays at ${state.turnCount} (incoming candidate turns: ${incomingCandidateTurns.length})`
      );
    }

    state = { ...state, transcript: incomingTranscript, turnCount: realTurnCount };

    // Single call replaces the manual answerEvaluator -> route -> node sequence.
    state = await compiledGraph.invoke(state);

    await checkpointer.save(threadId, state);

    const lastAiTurn = [...state.transcript].reverse().find((t) => t.speaker === 'ai');
    return {
      content: lastAiTurn ? lastAiTurn.content : 'Thank you for your time today.',
      shouldClose: state.shouldClose,
      state,
    };
  },

  async processOpeningTurn(sessionId) {
    const threadId = String(sessionId);
    let state = await checkpointer.load(threadId);
    if (!state) {
      throw new Error(`No graph state found for session ${sessionId}`);
    }

    // Opening turn has no candidate answer to evaluate yet, so it bypasses the
    // graph and calls questionGenerator directly — same as the original code.
    state = await questionGenerator(state);
    await checkpointer.save(threadId, state);

    const lastAiTurn = [...state.transcript].reverse().find((t) => t.speaker === 'ai');
    return {
      content: lastAiTurn ? lastAiTurn.content : 'Hello! Welcome to your interview today.',
      shouldClose: false,
      state,
    };
  },
};