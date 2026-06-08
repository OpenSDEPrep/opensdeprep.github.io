# OpenSDEPrep — Product Design Document

> **Companion doc:** [`DESIGN.md`](../DESIGN.md) is the **visual design system** (colors, typography, spacing, component styling). This document is the **architecture, information architecture, and data contract**. Where they overlap, this doc is authoritative for taxonomy/data model and naming; `DESIGN.md` is authoritative for visual treatment. Both have been reconciled to use the term **"article"** (not "lesson") and the difficulty scale **`easy / medium / hard`**.

## Overview

**What it is:** A fully static, GitHub Pages–hosted reference site for SDE interview preparation. Personal prep tracker first, shareable public resource second.

**North star:** When someone asks how you prepared for your switch to a product company, you send them this URL.

**Hosting:** GitHub Pages (free, static only)
**Framework:** Astro
**Content storage:** Separate GitHub repos per topic, synced into the Astro site at build time via GitHub Actions

---

## Repository Architecture

### Repos

| Repo | Purpose | V1? |
|------|---------|-----|
| `prep` | Astro site — renders, navigates, filters all content | Yes |
| `dsa` | DSA content: patterns, problems, complexity analysis | Yes |
| `lld` | LLD content: OOP principles, design patterns, class diagrams | Yes |
| `hld` | HLD content: system design, distributed systems, infra | Yes |
| `frontend` | Frontend-specific: JS/TS deep dives, browser internals, React internals, web perf | Yes |
| `devops` | DevOps: CI/CD, containers, Kubernetes, cloud infra, SRE | Yes |
| `lang-runtime` | Language/runtime deep dives: Python internals, JVM, V8, memory models | Yes |
| `ai-engineer` | AI Engineer: RAG, agents, LLM internals, evals, prompt engineering | Later |
| `behavioural` | Behavioural: STAR stories, leadership principles | Later |

---

## Content Structure (Topic Repos)

Every topic repo follows an identical directory convention. Consistency here is what makes the GitHub Actions sync and Astro content collections work cleanly.

### Directory Layout (example: `dsa`)

```
dsa/
├── README.md                     # Human-readable index, standalone value
├── content/
│   ├── arrays/
│   │   ├── two-pointer.md
│   │   └── sliding-window.md
│   ├── trees/
│   │   ├── binary-search-tree.md
│   │   └── segment-tree.md
│   ├── graphs/
│   │   ├── bfs-dfs.md
│   │   └── topological-sort.md
│   └── dynamic-programming/
│       ├── knapsack.md
│       └── longest-common-subsequence.md
├── roadmaps/
│   ├── dsa-core.yml              # Essential patterns for any SDE role
│   └── dsa-advanced.yml          # Deeper coverage for high DSA-bar companies
└── .github/
    └── workflows/
        └── notify-site.yml       # Triggers Astro site rebuild on push to main
```

Both `content/` and `roadmaps/` are synced into the Astro site. A topic repo can have any number of roadmaps — each is a different ordered "cut" through the same content.

### Roadmap YAML Schema

```yaml
title: "Master DSA — Core"
description: "Essential patterns covering 80% of SDE interview questions"
topic: dsa                          # must match the repo topic
phases:
  - name: Foundation
    description: "Must-know for any role or level"
    articles:
      - arrays/two-pointer          # slug relative to content/ in the same repo
      - arrays/sliding-window
      - trees/binary-search-tree
  - name: Core Patterns
    description: "The patterns that recur most in interviews"
    articles:
      - graphs/bfs-dfs
      - dynamic-programming/knapsack
      - heaps/top-k-elements
  - name: Advanced
    description: "Senior and staff-level depth"
    articles:
      - graphs/topological-sort
      - dynamic-programming/longest-common-subsequence
```

**Rules:**
- `topic` must match the repo it lives in.
- Article slugs are paths relative to `content/` — no `.md` extension.
- An article can appear in multiple roadmaps within the same repo.
- Phases are ordered — rendered top to bottom as a study sequence.

### Frontmatter Schema

Every MD file must include this frontmatter. This is the contract between topic repos and the Astro site.

```yaml
---
title: "Two Pointer Pattern"
description: "Using two pointers to solve array/string problems in O(n) time."
topic: dsa                          # dsa | lld | hld | frontend | devops | lang-runtime
subtopic: arrays                    # must be a valid subtopic for the topic (see table below)
roles:                              # which roles this is relevant for
  - backend
  - frontend
  - devops
experience:                         # target experience level
  - junior
  - mid
  - senior
difficulty: medium                  # easy | medium | hard
tags:                               # free-form, drives search/related content
  - arrays
  - sliding-window
  - two-pointer
status: complete                    # draft | complete (draft = visible but flagged)
last_updated: 2025-06-01
# Optional — code-bearing articles only:
languages:                          # languages for which code samples are embedded
  - python
  - java
primary_language: python            # default tab; must be a member of `languages`
---
```

**Rules:**
- `topic` must match the repo it lives in. Enforced by a simple lint step.
- `subtopic` must be one of the validated strings for the article's `topic` (see table below). Unknown subtopics are a build error.
- `status: draft` files are rendered but visually flagged — lets you push incomplete notes without breaking the site.
- `experience` and `roles` are arrays — a single article can target multiple.
- All required fields are required. Missing frontmatter = build warning, not failure (graceful degradation).
- **Reading time is derived, not authored** — computed from word count at build time, so it is *not* a frontmatter field.
- **Prerequisites are deferred to post-V1** — when added, they will introduce a `prerequisites` array field here.
- **`languages` / `primary_language`** are optional. Omit both for prose-only articles. When present, `primary_language` must be an element of `languages`.

### Subtopic Conventions per Topic

`subtopic` is validated at build time against the per-topic enum in `src/content.config.ts` (`SUBTOPICS`). Adding a new subtopic requires updating that map.

| Topic | Valid subtopics |
|-------|-----------------|
| DSA | `arrays`, `strings`, `linked-lists`, `trees`, `graphs`, `heaps`, `tries`, `backtracking`, `dynamic-programming`, `greedy`, `math`, `bit-manipulation` |
| LLD | `oop-principles`, `solid`, `design-patterns`, `class-diagrams`, `case-studies` |
| HLD | `fundamentals`, `databases`, `caching`, `messaging`, `api-design`, `distributed-systems`, `case-studies` |
| Frontend | `javascript`, `typescript`, `browser-internals`, `react-internals`, `css-architecture`, `web-performance`, `accessibility` |
| DevOps | `containers`, `kubernetes`, `ci-cd`, `cloud-infra`, `observability`, `sre`, `networking` |
| Lang & Runtime | `python-internals`, `jvm`, `v8`, `memory-models`, `concurrency`, `garbage-collection` |

---

## Astro Site Structure (`prep`)

### Directory Layout

```
prep/
├── src/
│   ├── content/                    # Synced from topic repos via GH Actions
│   │   ├── dsa/
│   │   ├── lld/
│   │   ├── hld/
│   │   ├── frontend/
│   │   ├── devops/
│   │   └── lang-runtime/
│   ├── roadmaps/                   # Synced roadmap YMLs from topic repos
│   │   ├── dsa/
│   │   ├── lld/
│   │   ├── hld/
│   │   ├── frontend/
│   │   ├── devops/
│   │   └── lang-runtime/
│   │
│   ├── pages/
│   │   ├── index.astro             # Home — topic grid + global filter entry
│   │   ├── [topic]/
│   │   │   ├── index.astro         # Topic landing — subtopic nav + filtered list
│   │   │   └── [...slug].astro     # Individual content page
│   │   └── 404.astro
│   │
│   ├── components/
│   │   ├── CodeTabs.astro          # Multi-language code tab switcher (used in MDX)
│   │   ├── Callout.astro           # Note / Tip / Warning / Interview / Common-mistake / Example (MDX)
│   │   ├── FilterBar.astro         # Role / experience / difficulty filters
│   │   ├── TopicGrid.astro         # Home page topic cards
│   │   ├── ContentList.astro       # Filtered list of articles within a topic
│   │   ├── ContentCard.astro       # Single article card (title, difficulty badge, tags)
│   │   ├── Sidebar.astro           # Article page: metadata, related content
│   │   ├── TableOfContents.astro   # Article page: sticky right-hand TOC (auto from headings)
│   │   ├── RelatedContent.astro    # Article page: related articles (derived from subtopic/tags)
│   │   ├── Breadcrumb.astro
│   │   └── SearchBar.astro         # Pagefind-powered static search (command-palette style)
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML shell, nav, footer
│   │   └── ContentLayout.astro     # Article page: sidebar + main content area
│   │
│   └── styles/
│       └── global.css
│
├── public/
│   └── favicon.svg
│
├── .github/
│   └── workflows/
│       ├── sync-and-deploy.yml     # Main workflow: sync content → build → deploy
│       └── pr-preview.yml          # Optional: build preview on PRs (future)
│
├── astro.config.mjs
├── package.json
└── README.md
```

### Astro Content Collections

The `src/content/` directory maps directly to Astro's Content Collections API. Each topic is one collection. The frontmatter schema above is enforced via Zod in `src/content/config.ts`.

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  topic: z.enum(['dsa', 'lld', 'hld', 'frontend', 'devops', 'lang-runtime']),
  subtopic: z.string(),
  roles: z.array(z.enum(['backend', 'frontend', 'devops', 'ai-engineer'])),
  experience: z.array(z.enum(['junior', 'mid', 'senior', 'staff'])),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.array(z.string()),
  status: z.enum(['draft', 'complete']),
  last_updated: z.string(),
});

export const collections = {
  dsa: defineCollection({ type: 'content', schema: contentSchema }),
  lld: defineCollection({ type: 'content', schema: contentSchema }),
  hld: defineCollection({ type: 'content', schema: contentSchema }),
  frontend: defineCollection({ type: 'content', schema: contentSchema }),
  devops: defineCollection({ type: 'content', schema: contentSchema }),
  'lang-runtime': defineCollection({ type: 'content', schema: contentSchema }),
};
```

---

## GitHub Actions: Sync & Deploy

### Trigger Strategy

Two triggers activate the Astro site rebuild:

1. **Push to `prep` main** — direct site changes (layout, components, etc.)
2. **`repository_dispatch` from any topic repo** — content push in `dsa` fires a webhook to `prep`, triggering a full sync + rebuild

Each topic repo has a small notify workflow:

```yaml
# dsa/.github/workflows/notify-site.yml
name: Notify Site

on:
  push:
    branches: [main]
    paths:
      - 'content/**'

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger site rebuild
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.SITE_DISPATCH_TOKEN }}
          repository: OpenSDEPrep/prep
          event-type: content-updated
          client-payload: '{"source": "dsa"}'
```

### Sync + Deploy Workflow

```yaml
# prep/.github/workflows/sync-and-deploy.yml
name: Sync Content & Deploy

on:
  push:
    branches: [main]
  repository_dispatch:
    types: [content-updated]
  schedule:
    - cron: '0 2 * * *'           # Nightly fallback sync at 2am UTC

jobs:
  sync-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout site repo
        uses: actions/checkout@v4

      - name: Checkout DSA content
        uses: actions/checkout@v4
        with:
          repository: OpenSDEPrep/dsa
          path: _sync/dsa
          token: ${{ secrets.CONTENT_READ_TOKEN }}

      # Repeat for each topic repo...

      - name: Sync content and roadmap directories
        run: |
          rsync -av --delete _sync/dsa/content/           src/content/dsa/
          rsync -av --delete _sync/lld/content/           src/content/lld/
          rsync -av --delete _sync/hld/content/           src/content/hld/
          rsync -av --delete _sync/frontend/content/      src/content/frontend/
          rsync -av --delete _sync/devops/content/        src/content/devops/
          rsync -av --delete _sync/lang-runtime/content/  src/content/lang-runtime/
          rsync -av --delete _sync/dsa/roadmaps/          src/roadmaps/dsa/
          rsync -av --delete _sync/lld/roadmaps/          src/roadmaps/lld/
          rsync -av --delete _sync/hld/roadmaps/          src/roadmaps/hld/
          rsync -av --delete _sync/frontend/roadmaps/     src/roadmaps/frontend/
          rsync -av --delete _sync/devops/roadmaps/       src/roadmaps/devops/
          rsync -av --delete _sync/lang-runtime/roadmaps/ src/roadmaps/lang-runtime/

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## Filtering & Taxonomy

All filtering is **client-side only** — no backend, no API. Implemented via URL query parameters so filtered views are shareable.

### Filter Dimensions

| Dimension | Values | URL param |
|-----------|--------|-----------|
| Role | backend, frontend, devops, ai-engineer | `?role=backend` |
| Experience | junior (0–2 YOE), mid (2–5 YOE), senior (5+ YOE), staff | `?exp=mid` |
| Difficulty | easy, medium, hard | `?diff=medium` |

### Filter Behavior

- Filters are **additive within a dimension** (multi-select: `?role=backend&role=frontend`)
- Filters are **intersecting across dimensions** (role=backend AND exp=mid)
- Filters **persist in URL** — shareable, bookmarkable
- Filter state initializes from URL params on page load
- No filters selected = show all content

### Search

Static full-text search via **Pagefind** — zero runtime cost, works on GitHub Pages, indexes all rendered content at build time. Integrated as a search bar in the nav.

---

## Pages & Navigation

### Home (`/`)

- Site header with name, tagline, link to GitHub org
- **Role selector** — "I'm preparing as a: Backend / Frontend / DevOps / AI Engineer" — sets default role filter, persists in URL
- **Topic grid** — 6 cards (DSA, LLD, HLD, Frontend, DevOps, Lang & Runtime), each showing article count
- **Quick filter bar** — experience level + difficulty, applied globally across all topics
- **Recommended learning paths** — surfaced from roadmap YMLs
- **Recently updated articles** — sorted by `last_updated`
- **Featured case studies** — pulled from the `case-studies` subtopics (LLD / HLD)
- **Open-source contribution note** — link to the GitHub org and "how to contribute"

### Topic Landing (`/dsa`, `/lld`, etc.)

- Topic header (name, description, article count)
- **Subtopic sidebar** — jump to arrays, trees, graphs, etc.
- **Filter bar** — role / experience / difficulty (inherits any home page filter state)
- **Article list** — cards with title, difficulty badge, role tags, reading time, last updated
- **Featured case studies** — when the topic has a `case-studies` subtopic (e.g. LLD, HLD)

### Content Page (`/dsa/arrays/two-pointer`)

- Breadcrumb: Home → DSA → Arrays → Two Pointer
- Main: rendered markdown with syntax highlighting (Shiki), copy-button code blocks, and MDX callouts
- Sidebar: difficulty badge, roles, experience level, tags, **reading time** (derived), last updated, link to source MD on GitHub
- Right-hand **Table of Contents** — sticky, auto-generated from headings, highlights active section (desktop/large screens only)
- Draft banner if `status: draft`
- **Related articles** — derived from shared subtopic / tags
- Previous / Next navigation within the same subtopic

### 404 Page

- Clean, on-brand. Links back to home and topic list.

---

## Filtering Taxonomy

### Experience Level Definitions

| Level | YOE | What they're tested on |
|-------|-----|----------------------|
| Junior | 0–2 | DSA fundamentals, basic LLD, language knowledge |
| Mid | 2–5 | LLD competency, HLD basics, system awareness |
| Senior | 5+ | Full HLD, LLD depth, scalability tradeoffs |
| Staff | 8+ | Architecture, org-wide system design, ambiguity |

Each article's `experience` array reflects which levels it's most relevant for. An article can apply to multiple levels.

---

## V1 Scope

**In scope:**
- All 6 topic repos with the defined directory + frontmatter structure
- Astro site with home, topic landing, and content pages
- GitHub Actions sync + deploy pipeline
- Client-side filtering by role, experience, difficulty
- URL-persisted filter state
- Pagefind static search
- Draft article support
- Source link on each article (links back to GitHub MD file)
- Reading time (derived from word count)
- Related articles (derived from shared subtopic / tags)
- Right-hand Table of Contents on article pages
- MDX callouts (Note / Tip / Warning / Interview / Common-mistake / Example)
- Featured case studies surfaced from `case-studies` subtopics

**Explicitly deferred:**
- `ai-engineer` repo
- `behavioural` repo
- Prerequisites (will add a `prerequisites` frontmatter field + Prerequisite Block)
- Standalone "exercises" as a distinct content type (case studies live in `case-studies` subtopics for now)
- Progress tracking (can revisit with localStorage, no backend needed)
- PR preview deployments

---

## Build Sequence

1. **Set up the Astro site repo** — scaffold Astro, configure GitHub Pages deployment, define content collections schema
2. **Create topic repos** — one at a time, starting with DSA (highest personal priority). Establish the directory structure and drop in first 3–5 real articles
3. **Wire the sync workflow** — get the GH Actions pipeline running end-to-end with one topic repo before adding the rest
4. **Build Astro pages** — home, topic landing, content page. Validate content renders correctly
5. **Add filtering** — FilterBar component, URL param state, client-side filter logic
6. **Add search** — Pagefind integration
7. **Add remaining topic repos** — one per sitting, LLD → HLD → Frontend → DevOps → Lang & Runtime
8. **Polish** — 404 page, breadcrumbs, draft banners, mobile responsiveness
