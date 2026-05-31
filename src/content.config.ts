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

// The frontmatter contract shared by every topic repo. See prd.md.
const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  topic: z.enum(TOPICS),
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
});

export type ArticleData = z.infer<typeof articleSchema>;

// Article slug from a file path relative to the topic's content/ root.
// Supports two authoring conventions (see prd.md + the lld repo):
//   arrays/two-pointer.md          -> arrays/two-pointer
//   oop-principles/README.md       -> oop-principles      (dir = article)
//   case-studies/easy/parking-lot/README.md -> case-studies/easy/parking-lot
export function articleSlug(entryPath: string): string {
  return entryPath
    .replace(/\\/g, '/')
    .replace(/\.(md|mdx)$/i, '')
    .replace(/\/(README|index)$/i, '');
}

const topicCollection = (topic: (typeof TOPICS)[number]) =>
  defineCollection({
    loader: glob({
      pattern: '**/*.{md,mdx}',
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
