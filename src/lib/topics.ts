import type { TOPICS } from '../content.config';

export type Topic = (typeof TOPICS)[number];

export interface TopicMeta {
  /** URL slug + collection key */
  slug: Topic;
  /** Display name */
  label: string;
  /** One-line description for cards / topic header */
  description: string;
  /** Ordered subtopics — drives sub-navigation (see prd.md taxonomy table) */
  subtopics: string[];
}

export const TOPIC_META: Record<Topic, TopicMeta> = {
  dsa: {
    slug: 'dsa',
    label: 'DSA',
    description: 'Patterns, problems, and complexity analysis for coding interviews.',
    subtopics: [
      'arrays', 'strings', 'linked-lists', 'trees', 'graphs', 'heaps',
      'tries', 'backtracking', 'dynamic-programming', 'greedy', 'math', 'bit-manipulation',
    ],
  },
  lld: {
    slug: 'lld',
    label: 'LLD',
    description: 'OOP principles, design patterns, SOLID, and class-design case studies.',
    subtopics: ['oop-principles', 'design-patterns', 'solid', 'class-diagrams', 'case-studies'],
  },
  hld: {
    slug: 'hld',
    label: 'HLD',
    description: 'System design, distributed systems, and real-world architecture.',
    subtopics: ['fundamentals', 'databases', 'caching', 'messaging', 'api-design', 'distributed-systems', 'case-studies'],
  },
  frontend: {
    slug: 'frontend',
    label: 'Frontend',
    description: 'JS/TS deep dives, browser internals, React internals, and web performance.',
    subtopics: ['javascript', 'typescript', 'browser-internals', 'react-internals', 'css-architecture', 'web-performance', 'accessibility'],
  },
  devops: {
    slug: 'devops',
    label: 'DevOps',
    description: 'Containers, Kubernetes, CI/CD, cloud infra, observability, and SRE.',
    subtopics: ['containers', 'kubernetes', 'ci-cd', 'cloud-infra', 'observability', 'sre', 'networking'],
  },
  'lang-runtime': {
    slug: 'lang-runtime',
    label: 'Lang & Runtime',
    description: 'Language and runtime internals: CPython, JVM, V8, memory models, concurrency.',
    subtopics: ['python-internals', 'jvm', 'v8', 'memory-models', 'concurrency', 'garbage-collection'],
  },
};

export const TOPIC_ORDER: Topic[] = ['dsa', 'lld', 'hld', 'frontend', 'devops', 'lang-runtime'];
