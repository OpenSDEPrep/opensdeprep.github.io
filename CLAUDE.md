# CLAUDE.md

Guidance for agents working in this repo. Read the two source-of-truth docs before non-trivial work:

- [`docs/prd.md`](docs/prd.md) — **architecture, information architecture, and data contract** (repos, content collections, frontmatter schema, filtering taxonomy, CI/CD, page/nav design). Authoritative for the data model and naming.
- [`DESIGN.md`](DESIGN.md) — **visual design system** in Google Labs' DESIGN.md format (YAML token frontmatter + prose). Authoritative for visual treatment. Keep its frontmatter valid per the [design.md spec](https://github.com/google-labs-code/design.md): nested YAML, token refs as `"{path.to.token}"`, no broken references.
- [`docs/content-curation-sources.md`](docs/content-curation-sources.md) — vetted source registry per topic; check before sourcing references for content.

## What this is

`OpenSDEPrep` is the **`prep`** repo: a fully static, GitHub Pages–hosted **Astro** site for SDE interview prep. No backend, no login, no progress tracking. Content lives in **separate per-topic GitHub repos** (`dsa`, `lld`, `hld`, `frontend`, `devops`, `lang-runtime`) and is synced into `src/content/` at build time via GitHub Actions. This repo renders, navigates, filters, and searches that content.

> **Status:** the Astro site is **not scaffolded yet** — this repo currently holds only design/spec docs and `assets/`. When building, follow the directory layout and build sequence in [`docs/prd.md`](docs/prd.md).

## Reconciled conventions (do not reintroduce the old variants)

- The content unit is an **"article"** — never "lesson". Components are `ContentCard`, `ContentList`, etc.
- Difficulty scale is **`easy | medium | hard`** — never beginner/intermediate/advanced.
- Topics: `dsa | lld | hld | frontend | devops | lang-runtime`. Roles: `backend | frontend | devops | ai-engineer`. Experience: `junior | mid | senior | staff`.
- **Case studies** live in the `case-studies` subtopics (LLD/HLD). There is **no standalone "exercise" content type** in V1.
- **Reading time** is derived from word count at build time — it is *not* a frontmatter field.
- **Prerequisites** are deferred post-V1 (no `prerequisites` frontmatter field yet).
- Frontmatter schema is enforced via Zod in `src/content/config.ts`; missing frontmatter is a build *warning*, not a failure.

## In V1

Astro site (home / topic landing / article / 404), content collections, client-side filtering by role/experience/difficulty (URL-persisted, shareable), Pagefind static search, derived reading time, related articles, right-hand TOC, MDX callouts, draft-article banners, GitHub Actions sync + deploy.

## Tooling

- Site: Astro, deployed to GitHub Pages (`dist/` → `peaceiris/actions-gh-pages`).
- Search: Pagefind (build-time static index). Code highlighting: Shiki.
- Sync: `repository_dispatch` from topic repos + nightly cron fallback; see the workflow in [`docs/prd.md`](docs/prd.md).
- Platform note: development is on Windows (PowerShell). Once `package.json` exists, expect `npm ci` / `npm run dev` / `npm run build`.
