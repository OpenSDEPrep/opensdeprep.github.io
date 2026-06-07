/**
 * Personal continuity — localStorage storage layer.
 *
 * Keys
 *   opensdeprep.viewed     — Map<articleKey, { title, href, topic, ts }>
 *   opensdeprep.bookmarked — Map<articleKey, { title, href, topic, ts }>
 *
 * articleKey = "<topic>/<slug>"  (matches the URL path segment)
 *
 * All functions are safe to call in SSR (they no-op when localStorage is
 * unavailable) and degrade gracefully when storage is cleared.
 */

export interface ArticleRecord {
  key: string;    // "<topic>/<slug>"
  title: string;
  href: string;   // full URL path (with base)
  topic: string;
  ts: number;     // Unix ms
}

// ── storage keys ──────────────────────────────────────────────────────────────

const VIEWED_KEY = 'opensdeprep.viewed';
const BOOKMARKED_KEY = 'opensdeprep.bookmarked';
const MAX_VIEWED = 20; // keep the 20 most-recent

// ── internal helpers ──────────────────────────────────────────────────────────

function isAvailable(): boolean {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function readMap(storageKey: string): Map<string, ArticleRecord> {
  if (!isAvailable()) return new Map();
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return new Map();
    const arr: ArticleRecord[] = JSON.parse(raw);
    return new Map(arr.map((r) => [r.key, r]));
  } catch {
    return new Map();
  }
}

function writeMap(storageKey: string, map: Map<string, ArticleRecord>): void {
  if (!isAvailable()) return;
  try {
    const arr = Array.from(map.values());
    localStorage.setItem(storageKey, JSON.stringify(arr));
  } catch {
    // quota exceeded or private browsing — silently ignore
  }
}

// ── viewed ────────────────────────────────────────────────────────────────────

/**
 * Record that the current user has viewed an article.
 * Moves it to the front (most recent) and trims to MAX_VIEWED.
 */
export function recordViewed(record: Omit<ArticleRecord, 'ts'>): void {
  const map = readMap(VIEWED_KEY);
  // remove old entry for this key so we can re-insert at the front
  map.delete(record.key);

  const full: ArticleRecord = { ...record, ts: Date.now() };

  // rebuild as ordered array (newest first), then cap
  const entries: [string, ArticleRecord][] = [[full.key, full], ...Array.from(map.entries())];
  const trimmed = entries.slice(0, MAX_VIEWED);
  writeMap(VIEWED_KEY, new Map(trimmed));
}

/** Returns recently-viewed articles, newest first. */
export function getViewed(): ArticleRecord[] {
  return Array.from(readMap(VIEWED_KEY).values()).sort((a, b) => b.ts - a.ts);
}

/** Returns true if the article has been viewed. */
export function hasViewed(key: string): boolean {
  return readMap(VIEWED_KEY).has(key);
}

// ── bookmarked ────────────────────────────────────────────────────────────────

/** Add a bookmark. Idempotent. */
export function addBookmark(record: Omit<ArticleRecord, 'ts'>): void {
  const map = readMap(BOOKMARKED_KEY);
  if (!map.has(record.key)) {
    map.set(record.key, { ...record, ts: Date.now() });
    writeMap(BOOKMARKED_KEY, map);
  }
}

/** Remove a bookmark. */
export function removeBookmark(key: string): void {
  const map = readMap(BOOKMARKED_KEY);
  if (map.has(key)) {
    map.delete(key);
    writeMap(BOOKMARKED_KEY, map);
  }
}

/** Toggle bookmark state. Returns the new state (true = bookmarked). */
export function toggleBookmark(record: Omit<ArticleRecord, 'ts'>): boolean {
  const map = readMap(BOOKMARKED_KEY);
  if (map.has(record.key)) {
    map.delete(record.key);
    writeMap(BOOKMARKED_KEY, map);
    return false;
  }
  map.set(record.key, { ...record, ts: Date.now() });
  writeMap(BOOKMARKED_KEY, map);
  return true;
}

/** Returns true if the article is bookmarked. */
export function isBookmarked(key: string): boolean {
  return readMap(BOOKMARKED_KEY).has(key);
}

/** Returns all bookmarks, newest first. */
export function getBookmarks(): ArticleRecord[] {
  return Array.from(readMap(BOOKMARKED_KEY).values()).sort((a, b) => b.ts - a.ts);
}

/** Clear all personal continuity data from localStorage. */
export function clearAll(): void {
  if (!isAvailable()) return;
  try {
    localStorage.removeItem(VIEWED_KEY);
    localStorage.removeItem(BOOKMARKED_KEY);
  } catch {
    // ignore
  }
}
