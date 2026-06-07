# CLAUDE.md

Guidance for agents working in this repo. Read the two source-of-truth docs before non-trivial work:

- [`docs/prd.md`](docs/prd.md) — **architecture, information architecture, and data contract** (repos, content collections, frontmatter schema, filtering taxonomy, CI/CD, page/nav design). Authoritative for the data model and naming.
- [`DESIGN.md`](DESIGN.md) — **visual design system** in Google Labs' DESIGN.md format (YAML token frontmatter + prose). Authoritative for visual treatment. Keep its frontmatter valid per the [design.md spec](https://github.com/google-labs-code/design.md): nested YAML, token refs as `"{path.to.token}"`, no broken references.
- [`docs/content-curation-sources.md`](docs/content-curation-sources.md) — vetted source registry per topic; check before sourcing references for content.

## What this is

`OpenSDEPrep` is the **`prep`** repo: a fully static, GitHub Pages–hosted **Astro** site for SDE interview prep. No backend, no login, no progress tracking. Content lives in **separate per-topic GitHub repos** (`dsa`, `lld`, `hld`, `frontend`, `devops`, `lang-runtime`) and is synced into `src/content/` at build time via GitHub Actions. This repo renders, navigates, filters, and searches that content.

> **Status:** Astro site scaffolded and building. `lld` is the first wired topic repo (28 articles). Other topic repos not yet created.

## Content sync (important)

Topic content is **not committed** to this repo — topic repos are the single source of truth. `content/` + `roadmaps/` are synced into `src/content/<topic>` / `src/roadmaps/<topic>` and **gitignored** (only `.gitkeep` is tracked). Run `npm run sync` locally before `npm run dev`; CI syncs on deploy. Configure repos in [`scripts/sync-content.mjs`](scripts/sync-content.mjs).

CI auth uses an **OpenSDEPrep GitHub App** (no PAT expiry): both this repo's deploy workflow (read topic repos) and each topic repo's `notify-site.yml` (dispatch a rebuild) mint a token via `actions/create-github-app-token` from `SYNC_APP_ID` + `SYNC_APP_PRIVATE_KEY` secrets. App permissions: Contents read/write + Metadata read, installed on all org repos.

Articles are authored as `<slug>.md` (prose-only) **or** `<slug>/<slug>.md` with code in `examples/<lang>/` / `solutions/<lang>/` (code-bearing). `README.md` is **never** an article — it is human docs only and is excluded by the glob pattern. The loader's `articleSlug()` applies the **collapse rule**: if a file's basename equals its parent directory name, the duplicate segment collapses (`parking-lot/parking-lot.md` → `parking-lot`). Never hardcode the `.md` filename when building source/edit links; always derive from `entry.filePath`.

## Reconciled conventions (do not reintroduce the old variants)

- The content unit is an **"article"** — never "lesson". Components are `ContentCard`, `ContentList`, etc.
- Difficulty scale is **`easy | medium | hard`** — never beginner/intermediate/advanced.
- Topics: `dsa | lld | hld | frontend | devops | lang-runtime`. Roles: `backend | frontend | devops | ai-engineer`. Experience: `junior | mid | senior | staff`.
- **Case studies** live in the `case-studies` subtopics (LLD/HLD). There is **no standalone "exercise" content type** in V1.
- **Reading time** is derived from word count at build time — it is *not* a frontmatter field.
- **Prerequisites** are deferred post-V1 (no `prerequisites` frontmatter field yet).
- Frontmatter schema is enforced via Zod in `src/content/config.ts`; missing frontmatter is a build *warning*, not a failure.

## Frontmatter schema (content model v2)

Full contract in `src/content.config.ts`. Key points for authoring:

### `subtopic` — per-topic enum (validated at build time)

`subtopic` must be one of the strings defined in `SUBTOPICS` for the article's `topic`. Unknown values cause a build error. Valid values per topic:

| Topic | Valid subtopics |
|-------|-----------------|
| `dsa` | `arrays`, `strings`, `linked-lists`, `trees`, `graphs`, `heaps`, `tries`, `backtracking`, `dynamic-programming`, `greedy`, `math`, `bit-manipulation` |
| `lld` | `oop-principles`, `solid`, `design-patterns`, `class-diagrams`, `case-studies` |
| `hld` | `fundamentals`, `databases`, `caching`, `messaging`, `api-design`, `distributed-systems`, `case-studies` |
| `frontend` | `javascript`, `typescript`, `browser-internals`, `react-internals`, `css-architecture`, `web-performance`, `accessibility` |
| `devops` | `containers`, `kubernetes`, `ci-cd`, `cloud-infra`, `observability`, `sre`, `networking` |
| `lang-runtime` | `python-internals`, `jvm`, `v8`, `memory-models`, `concurrency`, `garbage-collection` |

### `languages` and `primary_language` — code-bearing articles only

Articles that embed code samples add these optional fields:

```yaml
languages:
  - kotlin
  - java
primary_language: kotlin   # must be a member of languages; shown as the default tab
```

Rules enforced by Zod `superRefine`:
- `primary_language` requires `languages` to also be present.
- `primary_language` must be an element of `languages`.
- Omit both fields for prose-only articles.

## In V1

Astro site (home / topic landing / article / 404), content collections, client-side filtering by role/experience/difficulty (URL-persisted, shareable), Pagefind static search, derived reading time, related articles, right-hand TOC, MDX callouts, draft-article banners, GitHub Actions sync + deploy.

## Tooling

- Site: Astro, deployed to GitHub Pages (`dist/` → `peaceiris/actions-gh-pages`).
- Search: Pagefind (build-time static index). Code highlighting: Shiki.
- Sync: `repository_dispatch` from topic repos + nightly cron fallback; see the workflow in [`docs/prd.md`](docs/prd.md).
- Platform note: development is on Windows (PowerShell). Once `package.json` exists, expect `npm ci` / `npm run dev` / `npm run build`.
