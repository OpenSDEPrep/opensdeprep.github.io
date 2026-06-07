import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// NOTE: prd.md documents the legacy `type: 'content'` collections API.
// Astro 5 replaced that with the glob() loader (content layer). The schema,
// collection keys, and on-disk layout (src/content/<topic>/...) are unchanged.

export const TOPICS = [
  'dsa',
  'lld',
  'hld',
  'frontend',
  'devops',
  'lang-runtime',
] as const;

export const ROLES = ['backend', 'frontend', 'devops', 'ai-engineer'] as const;
export const EXPERIENCE = ['junior', 'mid', 'senior', 'staff'] as const;
export const DIFFICULTY = ['easy', 'medium', 'hard'] as const;

// Per-topic subtopic vocabularies (prd.md §"Subtopic Conventions per Topic").
// Each topic's articles must use one of these validated subtopic strings.
export const SUBTOPICS = {
  dsa: [
    'arrays',
    'strings',
    'linked-lists',
    'trees',
    'graphs',
    'heaps',
    'tries',
    'backtracking',
    'dynamic-programming',
    'greedy',
    'math',
    'bit-manipulation',
  ],
  lld: ['oop-principles', 'solid', 'design-patterns', 'class-diagrams', 'case-studies'],
  hld: [
    'fundamentals',
    'databases',
    'caching',
    'messaging',
    'api-design',
    'distributed-systems',
    'case-studies',
  ],
  frontend: [
    'javascript',
    'typescript',
    'browser-internals',
    'react-internals',
    'css-architecture',
    'web-performance',
    'accessibility',
  ],
  devops: ['containers', 'kubernetes', 'ci-cd', 'cloud-infra', 'observability', 'sre', 'networking'],
  'lang-runtime': [
    'python-internals',
    'jvm',
    'v8',
    'memory-models',
    'concurrency',
    'garbage-collection',
  ],
} as const satisfies Record<(typeof TOPICS)[number], readonly string[]>;

// Union type of all valid subtopic strings across every topic.
export type Subtopic = (typeof SUBTOPICS)[keyof typeof SUBTOPICS][number];

// The frontmatter contract shared by every topic repo. See prd.md.
const articleSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    topic: z.enum(TOPICS),
    // Validated against the per-topic enum in the superRefine below.
    subtopic: z.string(),
    roles: z.array(z.enum(ROLES)),
    experience: z.array(z.enum(EXPERIENCE)),
    difficulty: z.enum(DIFFICULTY),
    tags: z.array(z.string()),
    status: z.enum(['draft', 'complete']),
    // prd.md types this as a string, but authors write unquoted dates
    // (e.g. `last_updated: 2025-06-01`) which YAML parses as a Date. Coerce so
    // both forms work and we get a real Date for sorting/formatting.
    last_updated: z.coerce.date(),
    // Code-bearing articles list the languages they embed samples for.
    // `primary_language` selects the default tab; must be a member of `languages`.
    // Both fields are absent for prose-only articles.
    languages: z.array(z.string()).optional(),
    primary_language: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // 1. Per-topic subtopic validation.
    const allowed = SUBTOPICS[data.topic] as readonly string[];
    if (!allowed.includes(data.subtopic)) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_enum_value,
        options: [...allowed],
        received: data.subtopic,
        path: ['subtopic'],
        message: `"${data.subtopic}" is not a valid subtopic for topic "${data.topic}". Allowed: ${allowed.join(', ')}.`,
      });
    }

    // 2. primary_language must be a member of languages when present.
    if (data.primary_language !== undefined) {
      if (data.languages === undefined || data.languages.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['primary_language'],
          message: '`primary_language` requires `languages` to be set.',
        });
      } else if (!data.languages.includes(data.primary_language)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['primary_language'],
          message: `\`primary_language\` "${data.primary_language}" is not in \`languages\`: [${data.languages.join(', ')}].`,
        });
      }
    }
  });

export type ArticleData = z.infer<typeof articleSchema>;

// Article slug from a file path relative to the topic's content/ root.
// Content model v2 — meaningful filenames only; README-as-article is gone.
//
// Collapse rule: if a Markdown file's basename equals its parent directory's
// name, the duplicate segment collapses.  This lets code-bearing articles
// live in their own folder without an ugly doubled slug.
//
//   foundations/big-o.md                      -> foundations/big-o
//   foundations/foundations.md                -> foundations   (subtopic overview)
//   case-studies/parking-lot/parking-lot.md   -> case-studies/parking-lot
//
// README.md is never ingested — topic-repo README files are human docs only
// and are excluded by the glob pattern (see topicCollection below).
export function articleSlug(entryPath: string): string {
  const normalized = entryPath.replace(/\\/g, '/').replace(/\.(md|mdx)$/i, '');
  // Split into segments and check whether the last segment equals its parent.
  const segments = normalized.split('/');
  if (segments.length >= 2) {
    const last = segments[segments.length - 1];
    const parent = segments[segments.length - 2];
    if (last === parent) {
      segments.pop(); // collapse: "parking-lot/parking-lot" → "parking-lot"
    }
  }
  return segments.join('/');
}

const topicCollection = (topic: (typeof TOPICS)[number]) =>
  defineCollection({
    loader: glob({
      // Exclude README.md at any depth — those are human-readable repo docs,
      // not articles.  Every real article must have a meaningful filename.
      pattern: ['**/*.{md,mdx}', '!**/README.md', '!**/README.mdx'],
      base: `./src/content/${topic}`,
      generateId: ({ entry }) => articleSlug(entry),
    }),
    schema: articleSchema,
  });

// Roadmaps are ordered "cuts" through a topic's articles (YAML). See prd.md.
const roadmapSchema = z.object({
  title: z.string(),
  description: z.string(),
  topic: z.enum(TOPICS),
  phases: z.array(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      articles: z.array(z.string()),
    }),
  ),
});

export type RoadmapData = z.infer<typeof roadmapSchema>;

export const collections = {
  dsa: topicCollection('dsa'),
  lld: topicCollection('lld'),
  hld: topicCollection('hld'),
  frontend: topicCollection('frontend'),
  devops: topicCollection('devops'),
  'lang-runtime': topicCollection('lang-runtime'),
  roadmaps: defineCollection({
    loader: glob({ pattern: '**/*.{yml,yaml}', base: './src/roadmaps' }),
    schema: roadmapSchema,
  }),
};
