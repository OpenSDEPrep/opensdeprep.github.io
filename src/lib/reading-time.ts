// Reading time is DERIVED, not authored (see prd.md). Computed from the raw
// markdown body word count at build time.

const WORDS_PER_MINUTE = 220;

export function readingTimeMinutes(body: string | undefined): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function readingTimeLabel(body: string | undefined): string {
  return `${readingTimeMinutes(body)} min read`;
}
