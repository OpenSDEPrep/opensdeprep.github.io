# OpenSDEPrep — `prep`

The Astro site for [OpenSDEPrep](https://github.com/OpenSDEPrep): a fully static,
GitHub Pages–hosted reference site for SDE interview prep. It renders, navigates,
filters, and searches content that lives in **separate per-topic repos**
(`dsa`, `lld`, `hld`, `frontend`, `devops`, `lang-runtime`), synced in at build
time via GitHub Actions.

See [`docs/prd.md`](docs/prd.md) (architecture / data contract) and
[`DESIGN.md`](DESIGN.md) (visual design system). Agent guidance: [`CLAUDE.md`](CLAUDE.md).

## Develop

```bash
npm install
npm run sync       # clone topic repos → src/content/<topic> + src/roadmaps/<topic>
npm run dev        # http://localhost:4321
npm run build      # astro build + pagefind index → dist/
npm run preview    # serve the production build
npm run check      # astro check (types)
```

> **Content is not committed here.** Topic repos (`lld`, …) are the single source
> of truth; their `content/` + `roadmaps/` are synced into `src/` and gitignored.
> Run `npm run sync` (all topics) or `npm run sync -- lld` (one) before `dev`.
> CI does the equivalent via checkout + rsync on every deploy. Configure which
> repos are pulled in [`scripts/sync-content.mjs`](scripts/sync-content.mjs).

### Authoring conventions

An article is a markdown file with the [frontmatter contract](src/content.config.ts).
Two file shapes are supported and produce the same clean slug:

| On disk (in a topic repo) | URL slug |
| --- | --- |
| `content/arrays/two-pointer.md` | `arrays/two-pointer` |
| `content/oop-principles/README.md` | `oop-principles` |
| `content/case-studies/easy/parking-lot/README.md` | `case-studies/easy/parking-lot` |

i.e. a `README.md` makes its **directory** the article (the `lld` repo uses this,
keeping code samples like `.kt` files next to the prose).

## Structure

| Path | What |
| --- | --- |
| `src/content.config.ts` | Content collections + Zod frontmatter schema (one collection per topic) |
| `src/content/<topic>/` | Article markdown, synced from topic repos |
| `src/roadmaps/<topic>/` | Roadmap YAML, synced from topic repos |
| `src/pages/` | Home, `[topic]/`, `[topic]/[...slug]`, 404 |
| `src/components/` | TopicGrid, ContentCard/List, Sidebar, TableOfContents, RelatedContent, Callout, CodeTabs, FilterBar, Breadcrumb, SearchBar |
| `src/layouts/` | BaseLayout (shell) + ContentLayout (article 3-column) |
| `src/lib/` | Topic metadata, article queries, reading-time helper |
| `src/styles/global.css` | Design tokens mirrored from `DESIGN.md` |
| `.github/workflows/` | `sync-and-deploy.yml` (sync → build → Pages) |

## Notes / scaffold deviations from `docs/prd.md`

- **Content collections** use the Astro 5 `glob()` loader (content layer) rather
  than the legacy `type: 'content'` API shown in the prd. Schema and keys are unchanged.
- **Config location** is `src/content.config.ts` (Astro 5 canonical) rather than
  `src/content/config.ts`.
- **Deploy** uses `actions/deploy-pages` (official Pages artifact flow) rather
  than `peaceiris/actions-gh-pages`.
- **Filtering and search** render their controls but the client-side URL-param
  logic / Pagefind UI wiring are deferred to the "user journeys" pass.
- Set `base` in `astro.config.mjs` if deploying to a project page
  (`opensdeprep.github.io/prep`).
