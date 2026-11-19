import { getTopicsForSession } from '../state.js';

/**
 * difficultyAdjuster node — carefully adjusts difficulty level and picks the next topic.
 * Only runs after a 'strong' answer via followUpRouter.
 *
 * Difficulty Caps by Experience Level:
 * - student / junior: Max difficulty 2. Keep questions foundational, conceptual, and practical.
 * - mid: Max difficulty 3 (or 4 on multiple consecutive strong topics).
 * - senior / lead: Max difficulty 5.
 */
export const difficultyAdjuster = async (state) => {
  const { interviewType, difficultyLevel = 1, topicsCovered = [], currentTopic, candidateProfile } = state;

  const experience = (candidateProfile?.experienceLevel || 'mid').toLowerCase();
  const isFresher = experience === 'student' || experience === 'junior';
  const isSenior = experience === 'senior' || experience === 'lead' || experience === 'principal';

  // Determine difficulty cap and increment
  let maxDifficulty = 3;
  if (isFresher) {
    maxDifficulty = 2; // Strict ceiling for college students and junior freshers
  } else if (isSenior) {
    maxDifficulty = 5;
  } else {
    maxDifficulty = 4; // Mid-level cap
  }

  // Smooth, gradual progression:
  // For freshers, only go from 1 -> 2, never higher.
  const newDifficulty = Math.min(maxDifficulty, difficultyLevel + (isFresher && difficultyLevel >= 2 ? 0 : 1));

  // Mark current topic as covered
  const updatedCovered = currentTopic && !topicsCovered.includes(currentTopic)
    ? [...topicsCovered, currentTopic]
    : topicsCovered;

  // Pick next topic sequentially using role-aware topic banks
  const bank = getTopicsForSession({ interviewType, jobRole: candidateProfile?.jobRole });
  const remaining = bank.filter((t) => !updatedCovered.includes(t));

  if (remaining.length === 0) {
    // All topics exhausted — cycle back smoothly
    console.log(`[difficultyAdjuster] All topics exhausted. Cycling back to first topic: "${bank[0]}"`);
    return {
      ...state,
      difficultyLevel: newDifficulty,
      topicsCovered: updatedCovered,
      currentTopic: bank[0],
      nextInstruction: `The candidate handled topics well. Return to "${bank[0]}" with a practical follow-up at calibrated difficulty level ${newDifficulty}/5.`,
    };
  }

  // Select the first unused topic in sequence
  const nextTopic = remaining[0];

  return {
    ...state,
    difficultyLevel: newDifficulty,
    topicsCovered: updatedCovered,
    currentTopic: nextTopic,
    nextInstruction: `The candidate answered well. Transition smoothly to a new topic: "${nextTopic}" at calibrated difficulty level ${newDifficulty}/5.`,
  };
};
