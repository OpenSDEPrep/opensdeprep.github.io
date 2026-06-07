---
version: alpha
name: OpenSDEPrep
description: A modern, static, open-source SDE interview-prep & learning hub optimized for deep reading, structured navigation, and developer credibility.
brand:
  concept: "Curly braces { } enclosing two paths converging into one up-arrow — structured paths merging upward"
  palette-note: "Gradient is a brand element only (mark + OG image). Product UI accent stays indigo #4F46E5."
  grad-start: "#4F46E5"
  grad-end: "#06B6D4"
  tile-light: "#111827"
  tile-dark: "#1F2937"
  assets:
    favicon-svg: "public/favicon.svg"
    logo-light: "public/logo.svg"
    logo-dark: "public/logo-dark.svg"
    monogram: "public/monogram.svg"
    og-image: "public/og-image.svg"
  usage:
    clear-space: "Minimum clear space = 0.5× the mark height on all sides"
    min-size-full: "Full logo minimum: 120px wide"
    min-size-mark: "Mark / monogram minimum: 24px"
    dos: "Use light logo on white/neutral backgrounds; dark logo on dark surfaces"
    donts: "Do not recolor the gradient; do not stretch; do not place on busy backgrounds"
colors:
  primary: "#111827"
  secondary: "#4B5563"
  tertiary: "#4F46E5"
  neutral: "#F8FAFC"
  surface: "#FFFFFF"
  border: "#E5E7EB"
  muted: "#6B7280"
  code-bg: "#0F172A"
  code-text: "#E5E7EB"
  success: "#047857"
  warning: "#B45309"
  danger: "#B91C1C"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: 0.01em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: 0.08em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
rounded:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
  content: 720px
  page: 1200px
  gutter: 24px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.sm}"
    padding: 12px
    typography: "{typography.label-md}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 12px
    typography: "{typography.label-md}"
  card-topic:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  article-body:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
  code-block:
    backgroundColor: "{colors.code-bg}"
    textColor: "{colors.code-text}"
    typography: "{typography.code-md}"
    rounded: "{rounded.md}"
    padding: 20px
---

# DESIGN.md

> **Companion doc:** [`docs/OpenSDEPrep_Product_Design.md`](docs/OpenSDEPrep_Product_Design.md) owns the **architecture, information architecture, and data contract** (repos, content collections, frontmatter schema, filtering taxonomy, CI/CD). This document owns the **visual design system**. Reconciled conventions shared by both: the content unit is an **"article"** (not "lesson"); difficulty is **`easy / medium / hard`**; case studies live in the `case-studies` subtopics (no standalone "exercises" content type in V1); prerequisites are deferred post-V1.

## Overview

OpenSDEPrep is a modern open-source software engineering learning site built with Astro, GitHub Pages, and separate Markdown-only topic repositories.

The product is a public static learning hub for software engineers. It has no login, no progress tracking, and no backend. Its core job is to make structured technical learning clear, credible, searchable, and comfortable for long reading sessions.

The interface should feel like a polished developer learning product, not a plain documentation dump and not a marketing-heavy course platform.

Reference hierarchy:

1. Mintlify for core reading and documentation UX.
2. Linear for precise product UI polish.
3. Vercel for developer credibility and monochrome discipline.
4. Notion for warmth and approachable content organization.
5. Stripe for restrained homepage polish.
6. WIRED for long-form editorial depth.

The emotional target is calm confidence: technical, structured, modern, readable, and open-source friendly.

## Colors

The palette is rooted in high-contrast neutrals with a controlled indigo accent.

- **Primary (#111827):** Near-black slate for core text, article headings, and high-confidence interface elements.
- **Secondary (#4B5563):** Utility gray for supporting text, metadata, secondary navigation, and subdued labels.
- **Tertiary (#4F46E5):** Indigo accent for links, selected navigation states, primary actions, focus rings, and key highlights.
- **Neutral (#F8FAFC):** Soft page background. It should feel cleaner than beige and less harsh than pure white.
- **Surface (#FFFFFF):** Main cards, article surfaces, menus, and panels.
- **Border (#E5E7EB):** Subtle separators, card outlines, table borders, and sidebar dividers.
- **Muted (#6B7280):** Metadata, captions, helper text, timestamps, and low-priority labels.
- **Code Background (#0F172A):** Dark technical surface for code blocks.
- **Code Text (#E5E7EB):** Main code text color.
- **Success (#047857):** Published/completed/positive state when needed.
- **Warning (#B45309):** Caution callouts and important caveats.
- **Danger (#B91C1C):** Error, destructive, or critical warnings.

Use color sparingly. Article pages should be mostly neutral. The accent should guide interaction and orientation, not decorate every surface.

Gradients are allowed only on homepage and topic overview sections. They should be subtle, low-contrast, and secondary to content.

## Typography

The default typography should be modern, readable, and developer-oriented.

Use **Inter** for UI and prose. Use **JetBrains Mono** for code, technical labels, filenames, timestamps, and small uppercase metadata. If these fonts are unavailable, fall back to system sans-serif and system monospace stacks.

Typography roles:

- **Display:** Large homepage and topic landing headlines. Use tight tracking and strong weight.
- **Headlines:** Section titles, article titles, and topic page headings. Use strong hierarchy without becoming oversized.
- **Body:** Long-form article text. Prioritize comfortable line height and stable reading rhythm.
- **Labels:** Metadata, badges, filters, and navigation labels.
- **Code:** Code examples, inline technical terms, CLI commands, filenames, and config snippets.

Article body text must be easy to read for extended sessions. Avoid thin weights, decorative typefaces, and cramped line heights.

Optional editorial treatment is allowed for deep dives and system design essays, but it must not break the site-wide hierarchy or readability.

## Layout

The layout should support structured learning and long-form reading.

Global desktop layout:

- Top global navigation.
- Optional left topic sidebar on topic and article pages.
- Main content column.
- Right table of contents on article pages.

Global mobile layout:

- Collapsible navigation.
- No persistent right table of contents.
- Search remains accessible.
- Metadata and prerequisites appear above the article body.

Homepage layout:

1. Hero section.
2. Topic cards.
3. Recommended learning paths.
4. Recently updated articles.
5. Featured case studies (from the `case-studies` subtopics).
6. Open-source contribution note.

Topic page layout:

1. Topic overview.
2. Recommended learning path.
3. Skill map or section overview.
4. Section cards.
5. Featured case studies (when the topic has a `case-studies` subtopic).
6. Recently updated articles.

Article page layout:

- Left sidebar for topic navigation.
- Main article column with comfortable line length.
- Right table of contents on large screens.
- Previous and next article navigation at the bottom.
- Related articles, case studies, and Edit on GitHub link.

Spacing rules:

- Use compact spacing for controls and navigation.
- Use generous spacing inside article content.
- Use moderate spacing in card grids.
- Use large spacing for homepage sections.
- Keep sidebar navigation dense but readable.

## Elevation & Depth

Depth should be achieved primarily through tonal layers, borders, and spacing rather than heavy shadows.

Use:

- White cards on a soft neutral background.
- Light borders for structure.
- Very subtle shadows only for overlays, menus, and elevated cards.
- Tinted callout surfaces for notes, tips, warnings, and interview guidance.
- Strong contrast for code blocks.

Avoid:

- Heavy drop shadows.
- Glassmorphism.
- Strong background textures.
- Nested cards inside nested cards.
- Decorative depth on article pages.

The site should feel precise and lightweight. Article pages should be calmer than landing pages.

## Shapes

The shape language should be modern but restrained.

Use:

- 4px radius for very small UI details.
- 8px radius for buttons, inputs, and compact controls.
- 12px radius for code blocks and callouts.
- 16px radius for cards and panels.
- 24px radius for large homepage feature panels.
- Full pill radius only for badges, tags, and compact filters.

Avoid excessive roundness. The product should feel engineered, not playful.

## Components

### Topic Card

Purpose: route learners into a topic.

Include:

- Topic title.
- Short description.
- Article count when available.
- Difficulty range when available.
- Last updated signal when useful.
- Primary route.

Style:

- White surface.
- Subtle border.
- Soft hover state.
- Optional small accent mark.
- No heavy imagery required.

### Article Card

Purpose: preview a article in a list or grid.

Include:

- Title.
- Description.
- Difficulty.
- Estimated minutes.
- Tags or section.

Style:

- Compact.
- Highly scannable.
- Strong hover affordance.
- Clear relationship to topic and section.

### Difficulty Badge

Levels (must match the `difficulty` frontmatter enum):

- Easy.
- Medium.
- Hard.

Style:

- Small.
- Muted.
- Consistent.
- Accessible if color-coded (never color-only — pair with the label).

### Reading Time

Use compact display:

- `35 min read`
- `~35 min`

Do not overemphasize reading time.

### Prerequisite Block — *(Deferred to post-V1)*

This component is **not part of V1**. It is documented here so the visual language is ready when prerequisites land (which also adds a `prerequisites` frontmatter field). Until then, do not render prerequisite blocks.

Purpose: show what learners should know before starting.

Style:

- Soft surface.
- Compact list.
- Links to prerequisite articles.
- Clear but not alarming.

### Callout

Types:

- Note.
- Tip.
- Warning.
- Interview.
- Common mistake.
- Example.

Style:

- Lightly tinted background.
- Small icon optional.
- Clear title.
- No loud colors.

### Code Block

Requirements:

- Syntax highlighting.
- Copy button.
- Filename/title support.
- Optional line highlighting.
- Horizontal scroll on mobile.

Style:

- Developer-grade polish.
- High contrast.
- Comfortable padding.
- Rounded corners.

### Previous / Next

Purpose: keep learners moving through structured content.

Style:

- Two-card layout on desktop.
- Stacked layout on mobile.
- Show direction and article title.

### Search

Use Pagefind or equivalent static search.

Search UX:

- Prominent in global navigation.
- Keyboard accessible.
- Fast results.
- Results grouped by topic.
- Show title, excerpt, and topic.

Search should feel closer to a command palette than a basic search input.

### Article Header

Include:

- Title.
- Description.
- Difficulty badge.
- Estimated reading time.
- Last updated date.
- Prerequisites *(deferred to post-V1)*.

Keep metadata compact. Do not overload the first screen.

### Table of Contents

Use on article pages for desktop and large screens.

Behavior:

- Sticky on scroll.
- Highlight active section.
- Use compact text.
- Hide on mobile unless exposed through a collapsible control.

## Do's and Don'ts

### Do

- Optimize every major decision for article readability.
- Make navigation explain the curriculum structure.
- Use clear heading hierarchy and predictable article rhythm.
- Keep UI precise, restrained, and developer-oriented.
- Use metadata to help learners choose the right article.
- Make related articles, case studies, and next steps visible.
- Support keyboard navigation and visible focus states.
- Use semantic headings and accessible labels.
- Keep motion subtle and purposeful.
- Use gradients only on homepage or topic overview pages.
- Treat code examples as first-class visual content.
- Make pages fast and static-first.

### Don't

- Do not build a generic docs theme.
- Do not make the site look like a course marketplace.
- Do not use login, progress tracking, or backend-dependent UX.
- Do not overload article pages with decorative visuals.
- Do not use excessive gradients, glassmorphism, or animated backgrounds.
- Do not hide important learning structure behind clever UI.
- Do not make beginner content feel intimidating.
- Do not use color as the only way to communicate meaning.
- Do not sacrifice text contrast for polish.
- Do not make the whole site feel like Notion, Stripe, or Vercel. These are references, not templates.

When in doubt, optimize for the article page. If a design choice makes articles harder to read, remove it.
