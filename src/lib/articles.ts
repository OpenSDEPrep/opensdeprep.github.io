import { getCollection, type CollectionEntry } from 'astro:content';
import { TOPIC_ORDER, type Topic } from './topics';

export type ArticleEntry = CollectionEntry<Topic>;

/** All articles for a single topic, drafts last, newest-updated first. */
export async function getTopicArticles(topic: Topic): Promise<ArticleEntry[]> {
  const entries = (await getCollection(topic)) as ArticleEntry[];
  return entries.sort(sortArticles);
}

/** Every article across all six topic collections. */
export async function getAllArticles(): Promise<ArticleEntry[]> {
  const groups = await Promise.all(TOPIC_ORDER.map((t) => getTopicArticles(t)));
  return groups.flat();
}

/**
 * All distinct tags across every topic collection, each paired with its
 * article count. Sorted alphabetically.
 */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const all = await getAllArticles();
  const counts = new Map<string, number>();
  for (const entry of all) {
    for (const tag of entry.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/** All articles that carry a given tag, sorted (complete before draft, newest first). */
export async function getArticlesByTag(tag: string): Promise<ArticleEntry[]> {
  const all = await getAllArticles();
  return all.filter((e) => e.data.tags.includes(tag));
}

/** Count of articles per topic, keyed by topic slug. */
export async function getArticleCounts(): Promise<Record<Topic, number>> {
  const counts = {} as Record<Topic, number>;
  await Promise.all(
    TOPIC_ORDER.map(async (t) => {
      counts[t] = (await getCollection(t)).length;
    }),
  );
  return counts;
}

/**
 * Related articles for a given entry, derived from shared subtopic / tags
 * within the same topic (see prd.md). Highest overlap first.
 */
export function relatedArticles(entry: ArticleEntry, pool: ArticleEntry[], limit = 4): ArticleEntry[] {
  const tags = new Set(entry.data.tags);
  return pool
    .filter((e) => e.id !== entry.id)
    .map((e) => {
      let score = 0;
      if (e.data.subtopic === entry.data.subtopic) score += 2;
      score += e.data.tags.filter((t: string) => tags.has(t)).length;
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.e);
}

function sortArticles(a: ArticleEntry, b: ArticleEntry): number {
  // complete before draft, then most recently updated first
  if (a.data.status !== b.data.status) return a.data.status === 'draft' ? 1 : -1;
  return b.data.last_updated.getTime() - a.data.last_updated.getTime();
}
