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
