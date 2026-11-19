import { Annotation } from '@langchain/langgraph';

export const InterviewState = Annotation.Root({
  sessionId: Annotation({ default: () => '' }),
  interviewType: Annotation({ default: () => 'behavioral' }),
  candidateProfile: Annotation({
    default: () => ({ name: '', jobRole: '', experienceLevel: 'mid' }),
  }),
  transcript: Annotation({ default: () => [] }),
  currentTopic: Annotation({ default: () => '' }),
  difficultyLevel: Annotation({ default: () => 1 }),
  topicsCovered: Annotation({ default: () => [] }),
  lastAnswerQuality: Annotation({ default: () => null }),
  shouldClose: Annotation({ default: () => false }),
  nextInstruction: Annotation({ default: () => null }),
  turnCount: Annotation({ default: () => 0 }),
  startedAt: Annotation({ default: () => null }),
  flaggedClaims: Annotation({ default: () => [] }),
  surpriseUsed: Annotation({ default: () => false }),
});

export const topicBanks = {
  behavioral: [
    'teamwork and collaboration', 'conflict resolution', 'leadership experience',
    'handling failure', 'time management under pressure', 'adaptability to change',
    'giving and receiving feedback', 'cross-functional communication',
  ],
  technical: [
    'data structures and practical algorithms', 'database querying and schema design',
    'object-oriented and modular code', 'API design and REST principles',
    'debugging and error handling', 'code review and clean coding practices',
    'basic system architecture', 'testing fundamentals',
  ],
  system_design: [
    'scalability and load balancing', 'caching strategies', 'database sharding and replication',
    'microservices vs monolith', 'event-driven architecture', 'distributed consensus',
    'CDN and edge computing', 'rate limiting and throttling',
  ],
  hr_culture_fit: [
    'motivation and career goals', 'working style and preferences', 'company culture alignment',
    'handling ambiguity', 'growth mindset', 'work-life integration',
    'diversity and inclusion', 'long-term vision',
  ],
};

// Role-aware technical topic banks
export const roleSpecificTechnicalTopics = {
  frontend: [
    'DOM manipulation and modern JavaScript concepts',
    'React components and state management',
    'component lifecycle and hooks',
    'asynchronous operations and REST API integration',
    'CSS layouts and responsive design',
    'web performance optimization and rendering basics',
  ],
  fullstack: [
    'frontend-backend integration and API contracts',
    'relational and NoSQL database querying',
    'state management and user authentication',
    'API error handling and input validation',
    'asynchronous workflows and web security basics',
    'deployment and fullstack debugging',
  ],
  data: [
    'SQL queries and complex joins',
    'data cleaning and preprocessing pipelines',
    'exploratory data analysis and feature logic',
    'key business metrics and KPI interpretation',
    'data visualization and storytelling',
    'A/B testing methodology and significance',
  ],
  marketing: [
    'marketing funnel analytics and user acquisition',
    'audience segmentation and customer personas',
    'A/B test design and conversion optimization',
    'growth strategy and retention loops',
    'marketing automation and analytics tooling',
    'performance marketing ROI and data-driven decisions',
  ],
  design: [
    'user research and persona formulation',
    'wireframing and high-fidelity prototyping',
    'design systems and component consistency',
    'usability testing and user feedback synthesis',
    'accessibility (a11y) and inclusive design',
    'cross-functional collaboration with engineers',
  ],
};

/**
 * Returns tailored topics based on interview type and the candidate's chosen job role.
 */
export const getTopicsForSession = ({ interviewType, jobRole = '' }) => {
  if (interviewType !== 'technical') {
    return topicBanks[interviewType] || topicBanks.behavioral;
  }

  const role = (jobRole || '').toLowerCase();
  if (role.includes('front') || role.includes('ui') || role.includes('react') || role.includes('web developer')) {
    return roleSpecificTechnicalTopics.frontend;
  }
  if (role.includes('full') || role.includes('mern') || role.includes('mean')) {
    return roleSpecificTechnicalTopics.fullstack;
  }
  if (role.includes('data') || role.includes('analyst') || role.includes('machine learning') || role.includes('ai')) {
    return roleSpecificTechnicalTopics.data;
  }
  if (role.includes('market') || role.includes('growth') || role.includes('product')) {
    return roleSpecificTechnicalTopics.marketing;
  }
  if (role.includes('design') || role.includes('ux') || role.includes('ui/ux')) {
    return roleSpecificTechnicalTopics.design;
  }

  return topicBanks.technical;
};

// Default fallback state
export const defaultState = {
  sessionId: '', interviewType: 'behavioral',
  candidateProfile: { name: '', jobRole: '', experienceLevel: 'mid' },
  transcript: [], currentTopic: '', difficultyLevel: 1, topicsCovered: [],
  lastAnswerQuality: null, shouldClose: false, nextInstruction: null,
  turnCount: 0, startedAt: null, flaggedClaims: [], surpriseUsed: false,
};
