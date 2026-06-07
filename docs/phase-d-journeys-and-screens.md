# Phase D — User Journeys & Screens (design spec)

> Status: approved 2026-06-07. Source of truth for the Phase D issue block (app UX,
> journeys, and branding) on `OpenSDEPrep/opensdeprep.github.io`. Companion docs:
> [`prd.md`](prd.md) (architecture/data contract), [`../DESIGN.md`](../DESIGN.md) (visual system).

## Context & principles

OpenSDEPrep is a static, no-backend, no-login Astro site aggregating per-topic content
repos (`lld` live; `dsa`, `hld`, `behavioral`, `cs-fundamentals` planned). Phase D turns the
content renderer into a usable app: discovery, search, filtering, personal continuity,
revision, branding, and dark mode.

- **Audience: me-first** (curator/learner), public later. No onboarding/marketing/contributor
  UX yet.
- **No backend, no login.** All personal state is **localStorage only**.
- **Learn at your own pace.** Nothing is time-bound; the only time signal is summed reading
  time. No durations, no "6-week" framing.
- **Only topics/with content render** (see issue 05 of the content-model work).

## Journeys (11)

Discover · Topic browse · Deep-read · Roadmap/plan study (per-topic + cross-topic) · Search ·
Filter (per-topic) · Continuity (viewed + bookmark + library) · Revision (spaced repetition) ·
Tag/collection discovery · Dark-mode/preferences · LLM content access (research spike).

## Screens

| Screen | Route | Serves |
| --- | --- | --- |
| Home / Discover | `/` | nav, hero, recently-viewed strip, topic grid (non-empty), featured cross-topic plans, recently-updated |
| Topic landing | `/<topic>` | header, this topic's roadmap index, subtopic sections, article list + filter bar |
| Roadmap / plan detail | `/<topic>/roadmaps/<id>`, `/plans/<id>` | phases, ordered articles, estimated reading time = Σ article times, recently-viewed markers (position-by-proxy) |
| Article / deep-read | `/<topic>/<slug>` | TOC, multi-lang code, prev/next, related, edit-on-GitHub, bookmark + mark-as-learned, tag chips |
| Search palette | overlay (⌘K) | grouped results, keyboard nav, no-results state |
| Tag page | `/tags/<tag>` (+ optional `/tags`) | cross-topic article list for a tag |
| Library | `/library` | recently-viewed + bookmarks, empty state |
| Revision | `/revision` | items due now grouped by stage; "Mark revised" advances stage |
| Plans index | `/plans` | the cross-topic study plans |
| 404 + empty states | `/404` | + enumerated empties (library, search, filter) |

## Cross-cutting

- **Dark mode.** DESIGN.md gains a dark palette; a persisted theme toggle (respects
  `prefers-color-scheme`); code blocks, Mermaid SVG, and the logo need dark variants.
- **Preferences menu** in the nav: theme toggle + default code language (the global
  language selector from the content-model work).

## Data model notes

- **Per-topic roadmaps** live in **topic repos** — multiple `.yml` per topic, already
  supported by the roadmaps collection. A topic can have several named roadmaps.
- **Cross-topic plans span topics, so they are authored in the *site* repo** (aggregator-
  owned), not in any topic repo. A plan = ordered phases of `{topic, slug}` references.
  Both roadmaps and plans render through the same detail screen.
- **Estimated time** anywhere = summed reading time of constituent articles. No durations.
- **Personal state (localStorage).** Per article: `viewed` (auto, timestamp), `bookmarked`
  (manual), `learned` (manual; timestamp + revision `stage`). The revision queue is derived
  from `learned` items and their stage.

### Spaced-repetition schedule

`learned` starts the clock. Due offsets by stage from the last revision:
`stage 0 → +24h`, `stage 1 → +7d`, `stage 2 → +30d`, `stage 3+ → +30d` (recurring).
"Mark revised" on a due item advances the stage and reschedules; an item can be reset.
A nav badge shows the count due today. Trigger is **explicit "Mark as learned"** — not
auto-on-view and not the bookmark action.

## LLM content access (research spike)

Output is a **recommendation doc, not code.** Investigate how to best expose all site
content so LLM services (ChatGPT and Claude web first) can fetch it for deeper dives,
examples, and interview-style quizzing on a topic/roadmap:

- `llms.txt` / `llms-full.txt` (llmstxt.org convention) — discovery + concatenated content.
- `sitemap.xml` (`@astrojs/sitemap`).
- Per-page raw-markdown endpoints (clean fetchable source per article).
- `robots.txt` crawler allowlist (GPTBot, ClaudeBot, …).
- **Roadmap/topic bundling** — one fetchable document per roadmap/topic so a user can paste
  a single URL into Claude/ChatGPT and be quizzed on the whole path.
- Key open question: what do ChatGPT/Claude web actually consume *today* vs. emerging
  standards; licensing/attribution; abuse/rate considerations.

## Phase D issue block (global order 21+)

1. Brand kit — indigo→cyan mark, monogram, favicon, OG; nav + org-profile integration.
2. Dark mode — DESIGN.md dark palette + persisted toggle + theming code/Mermaid/logo.
3. App shell — global nav (logo + ⌘K trigger + preferences menu) + footer.
4. Home / Discover.
5. Roadmap & plan screens — per-topic roadmap index + roadmap/plan detail (Σ time) +
   cross-topic plans data model (site-owned) + `/plans`.
6. Search command palette — Pagefind, grouped results, keyboard nav, empty state.
7. Filtering (per-topic, URL-persisted/shareable).
8. Tag / collection views (`/tags/<tag>`) + tag chips on articles.
9. Personal continuity (viewed + bookmark + `/library`).
10. Spaced-repetition revision (learned state + schedule + `/revision` + nav badge).
11. Article deep-read refinements (bookmark, mark-as-learned, tag chips, polish).
12. Design-system living tracker (incl. dark tokens).
13. **[Backlog]** Cheatsheets / quick-reference content type (deferred).
14. **[Spike]** LLM content access (llms.txt, sitemap, raw-md, crawler allowlist, bundling).

Wireframes (lo-fi HTML, greyscale; see `site/docs/wireframes/home.html`) are produced inside
each screen issue (4, 5, 6, 8, 9, 10), not as a standalone item. Sequencing: 9 → 10 share
the localStorage layer; 1, 2, 14 are zero-dependency parallel starts. Phase D runs mostly
in parallel with the content-model work — it's shell/brand/discovery, not the content
pipeline; only 11 depends on the article-rendering changes.
