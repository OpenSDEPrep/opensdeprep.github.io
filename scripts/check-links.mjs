#!/usr/bin/env node
// Build-time dead-link / missing-code checker (issue #09)
//
// Scans every .md/.mdx file under src/content/ and reports:
//   1. Internal article links that don't resolve to a known slug
//   2. Relative code-file references (e.g. ./foo.kt) that don't exist on disk
//   3. Optionally validates external HTTP(S) links (opt-in via --check-external)
//
// Usage:
//   node scripts/check-links.mjs              # warn only, exit 0
//   node scripts/check-links.mjs --fail       # exit 1 on broken internal links
//   node scripts/check-links.mjs --check-external --fail
//
// Called from `npm run build` via the check-links npm script.
// Add `"check-links": "node scripts/check-links.mjs --fail"` to package.json
// scripts and change the build script to `"build": "npm run check-links && astro build && pagefind --site dist"`

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, extname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_ROOT = join(ROOT, 'src', 'content');

const args = process.argv.slice(2);
const FAIL_ON_ERROR = args.includes('--fail');
const CHECK_EXTERNAL = args.includes('--check-external');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Recursively collect all .md/.mdx files under a directory. */
function collectMarkdownFiles(dir) {
  const results = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMarkdownFiles(full));
    } else if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Derive the article slug from an absolute file path.
 * Mirrors the `articleSlug()` logic in src/content.config.ts.
 *   src/content/lld/oop-principles/README.md  -> oop-principles
 *   src/content/lld/arrays/two-pointer.md      -> arrays/two-pointer
 */
function articleSlugFromPath(absPath) {
  return absPath
    .replace(/\\/g, '/')
    .replace(/\.(md|mdx)$/i, '')
    .replace(/\/(README|index)$/i, '');
}

/**
 * Extract the topic and slug from a file path like
 *   …/src/content/lld/oop-principles/README.md
 * Returns { topic: 'lld', slug: 'oop-principles' }.
 */
function topicAndSlug(absPath) {
  const rel = absPath.replace(/\\/g, '/');
  const match = rel.match(/src\/content\/([^/]+)\/(.+)$/);
  if (!match) return null;
  const [, topic, rest] = match;
  const slug = articleSlugFromPath(rest.replace(/\\/g, '/'));
  return { topic, slug };
}

// ---------------------------------------------------------------------------
// Parse links from markdown source
// ---------------------------------------------------------------------------

/**
 * Extract all markdown links and HTML href/src values from a string.
 * Returns an array of { href, line } objects.
 */
function extractLinks(source) {
  const links = [];
  const lines = source.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Markdown links: [text](href) and images: ![alt](src)
    for (const m of line.matchAll(/!?\[([^\]]*)\]\(([^)]+)\)/g)) {
      const raw = m[2].split(/\s+/)[0]; // strip optional title
      links.push({ href: raw, line: lineNum });
    }

    // Reference-style link definitions: [id]: href
    for (const m of line.matchAll(/^\s*\[[^\]]+\]:\s*(\S+)/g)) {
      links.push({ href: m[1], line: lineNum });
    }

    // HTML attributes: href="..." and src="..."
    for (const m of line.matchAll(/(?:href|src)="([^"]+)"/g)) {
      links.push({ href: m[1], line: lineNum });
    }
  }

  return links;
}

// ---------------------------------------------------------------------------
// Build the full slug index
// ---------------------------------------------------------------------------

function buildSlugIndex() {
  const index = new Map(); // "topic/slug" -> absPath
  const files = collectMarkdownFiles(CONTENT_ROOT);
  for (const f of files) {
    const ts = topicAndSlug(f);
    if (!ts) continue;
    index.set(`${ts.topic}/${ts.slug}`, f);
    // Also index bare slug (within-topic links often omit the topic prefix)
    if (!index.has(ts.slug)) {
      index.set(ts.slug, f);
    }
  }
  return index;
}

// ---------------------------------------------------------------------------
// Link classification
// ---------------------------------------------------------------------------

/** True if the href looks like an internal article link (not external, not anchor-only). */
function isInternalArticleLink(href) {
  if (!href) return false;
  if (href.startsWith('http://') || href.startsWith('https://')) return false;
  if (href.startsWith('#')) return false;                  // anchor
  if (href.startsWith('mailto:')) return false;
  if (/\.(png|jpe?g|gif|svg|webp|ico|pdf|zip|gz|tar)$/i.test(href)) return false;
  // Relative code-file references are handled separately
  if (/\.(kt|java|py|js|ts|go|rs|cpp|c|cs|rb|sh|yaml|yml|json|toml)$/i.test(href)) return false;
  return true;
}

/** True if the href is a relative reference to a source-code file. */
function isCodeFileRef(href) {
  if (!href) return false;
  if (href.startsWith('http://') || href.startsWith('https://')) return false;
  return /\.(kt|java|py|js|ts|go|rs|cpp|c|cs|rb|sh)$/i.test(href);
}

/** True if the href is an external HTTP(S) URL. */
function isExternalLink(href) {
  return typeof href === 'string' && (href.startsWith('http://') || href.startsWith('https://'));
}

// ---------------------------------------------------------------------------
// Resolve an internal article link against the slug index
// ---------------------------------------------------------------------------

/**
 * Try to resolve `href` from the perspective of `sourceFile`.
 * Returns true if the link resolves to a known article slug.
 */
function resolveInternalLink(href, sourceFile, slugIndex, topic) {
  // Strip fragment and query
  const clean = href.split('#')[0].split('?')[0];
  if (!clean) return true; // anchor-only after stripping

  // Absolute-path style: /lld/oop-principles -> lld/oop-principles
  if (clean.startsWith('/')) {
    const key = clean.replace(/^\//, '').replace(/\/$/, '');
    return slugIndex.has(key);
  }

  // Relative path — resolve relative to the source file's directory
  const sourceDir = dirname(sourceFile);
  const resolved = resolve(sourceDir, clean).replace(/\\/g, '/');

  // Strip the ROOT prefix to get something like src/content/lld/oop-principles
  const relToRoot = resolved
    .replace(ROOT.replace(/\\/g, '/'), '')
    .replace(/^\//, '');

  // Match against src/content/<topic>/<slug>
  const m = relToRoot.match(/^src\/content\/([^/]+)\/(.+)$/);
  if (!m) return false;
  const [, resolvedTopic, resolvedSlug] = m;
  const normalised = articleSlugFromPath(resolvedSlug);
  return slugIndex.has(`${resolvedTopic}/${normalised}`) || slugIndex.has(normalised);
}

// ---------------------------------------------------------------------------
// Validate external links (optional, async)
// ---------------------------------------------------------------------------

async function checkExternalLink(href) {
  try {
    const resp = await fetch(href, {
      method: 'HEAD',
      headers: { 'User-Agent': 'OpenSDEPrep-link-checker/1.0' },
      signal: AbortSignal.timeout(8000),
      redirect: 'follow',
    });
    return resp.ok;
  } catch {
    // Try GET as a fallback (some servers reject HEAD)
    try {
      const resp = await fetch(href, {
        method: 'GET',
        headers: { 'User-Agent': 'OpenSDEPrep-link-checker/1.0' },
        signal: AbortSignal.timeout(10000),
        redirect: 'follow',
      });
      return resp.ok;
    } catch {
      return false;
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log('OpenSDEPrep link checker\n');

  const slugIndex = buildSlugIndex();
  const files = collectMarkdownFiles(CONTENT_ROOT);

  if (files.length === 0) {
    console.log('No content files found under src/content/ — run `npm run sync` first.');
    process.exit(0);
  }

  console.log(`Scanning ${files.length} content files…\n`);

  let internalErrors = 0;
  let codeErrors = 0;
  let externalErrors = 0;
  const externalQueue = []; // { href, sourcePath, line } — deduplicated by href

  for (const absPath of files) {
    const source = readFileSync(absPath, 'utf8');
    const ts = topicAndSlug(absPath);
    const topic = ts?.topic ?? '';

    // Make the path prettier for output
    const displayPath = relative(ROOT, absPath).replace(/\\/g, '/');

    const links = extractLinks(source);

    for (const { href, line } of links) {
      if (isCodeFileRef(href)) {
        // Resolve relative to article file
        const resolved = resolve(dirname(absPath), href);
        if (!existsSync(resolved)) {
          console.error(`  [MISSING CODE]  ${displayPath}:${line}  →  ${href}`);
          codeErrors++;
        }
      } else if (isInternalArticleLink(href)) {
        const ok = resolveInternalLink(href, absPath, slugIndex, topic);
        if (!ok) {
          console.error(`  [DEAD LINK]     ${displayPath}:${line}  →  ${href}`);
          internalErrors++;
        }
      } else if (CHECK_EXTERNAL && isExternalLink(href)) {
        // Deduplicate
        if (!externalQueue.find((e) => e.href === href)) {
          externalQueue.push({ href, sourcePath: displayPath, line });
        }
      }
    }
  }

  // External link checks (optional)
  if (CHECK_EXTERNAL && externalQueue.length > 0) {
    console.log(`\nChecking ${externalQueue.length} external links…`);
    for (const { href, sourcePath, line } of externalQueue) {
      const ok = await checkExternalLink(href);
      if (!ok) {
        console.error(`  [DEAD EXTERNAL] ${sourcePath}:${line}  →  ${href}`);
        externalErrors++;
      }
    }
  }

  // Summary
  console.log('\n--- Summary ---');
  console.log(`  Internal dead links  : ${internalErrors}`);
  console.log(`  Missing code files   : ${codeErrors}`);
  if (CHECK_EXTERNAL) {
    console.log(`  Dead external links  : ${externalErrors}`);
  }

  const hasErrors = internalErrors > 0 || codeErrors > 0 || (CHECK_EXTERNAL && externalErrors > 0);

  if (hasErrors) {
    console.error('\nLink check FAILED. Fix the issues above before merging.\n');
    if (FAIL_ON_ERROR) process.exit(1);
  } else {
    console.log('\nLink check passed.\n');
  }
}

main().catch((err) => {
  console.error('Unexpected error in link checker:', err);
  process.exit(1);
});
