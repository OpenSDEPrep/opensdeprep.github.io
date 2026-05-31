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
      score += e.data.tags.filter((t) => tags.has(t)).length;
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
