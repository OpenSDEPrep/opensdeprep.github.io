#!/usr/bin/env node
// Local content sync: clones each configured topic repo and copies its
// `content/` and `roadmaps/` into src/. Topic repos are the single source of
// truth — synced dirs are gitignored (see .gitignore). CI does the equivalent
// via checkout + rsync in .github/workflows/sync-and-deploy.yml.
//
// Usage:
//   npm run sync                              # all configured topics (GitHub)
//   npm run sync -- lld                       # one topic from GitHub (others untouched)
//   npm run sync -- --local lld=/abs/path     # one topic from a local checkout
//   npm run sync -- --local lld=../sibling    # relative paths are resolved from CWD
//   npm run sync -- --local lld=/path dsa     # mix local + GitHub in one run
//
// --local <topic>=<path> copies from a local directory instead of cloning.
// Multiple --local flags are supported. Any topic listed without --local is
// fetched from GitHub as usual. Topics not mentioned at all are left untouched.

import { execFileSync } from 'node:child_process';
import { cpSync, rmSync, mkdirSync, existsSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Topic repos that currently exist. Add entries as repos come online. */
const TOPIC_REPOS = [
  { topic: 'lld', repo: 'OpenSDEPrep/lld', branch: 'main' },
  // { topic: 'dsa', repo: 'OpenSDEPrep/dsa', branch: 'main' },
];

// ---------------------------------------------------------------------------
// Parse CLI arguments
// ---------------------------------------------------------------------------

const rawArgs = process.argv.slice(2);

/** Map of topic -> local absolute path (populated by --local flags). */
const localOverrides = new Map();

/** Topics explicitly requested via positional args (no --local). */
const positionalTopics = [];

for (let i = 0; i < rawArgs.length; i++) {
  if (rawArgs[i] === '--local') {
    const pair = rawArgs[++i];
    if (!pair || !pair.includes('=')) {
      console.error('--local requires a <topic>=<path> argument, e.g. --local lld=/home/user/lld');
      process.exit(1);
    }
    const eqIdx = pair.indexOf('=');
    const topic = pair.slice(0, eqIdx);
    const rawPath = pair.slice(eqIdx + 1);
    const absPath = isAbsolute(rawPath) ? rawPath : resolve(process.cwd(), rawPath);
    localOverrides.set(topic, absPath);
  } else if (!rawArgs[i].startsWith('--')) {
    positionalTopics.push(rawArgs[i]);
  }
}

// Determine which topics to process and how.
// Priority: --local overrides > positional topic filter > all configured topics.
const allRequestedTopics = [...new Set([...localOverrides.keys(), ...positionalTopics])];

let targets;
if (allRequestedTopics.length === 0) {
  // No filters — sync everything from GitHub
  targets = TOPIC_REPOS.map((t) => ({ ...t, localPath: null }));
} else {
  targets = allRequestedTopics.map((topic) => {
    const configured = TOPIC_REPOS.find((t) => t.topic === topic);
    const localPath = localOverrides.get(topic) ?? null;
    if (!configured && !localPath) {
      console.error(
        `Unknown topic: "${topic}". Configured topics: ${TOPIC_REPOS.map((t) => t.topic).join(', ')}`,
      );
      process.exitCode = 1;
      return null;
    }
    return {
      topic,
      repo: configured?.repo ?? `OpenSDEPrep/${topic}`,
      branch: configured?.branch ?? 'main',
      localPath,
    };
  }).filter(Boolean);
}

if (targets.length === 0) {
  console.log('Nothing to sync. Configured topics:', TOPIC_REPOS.map((t) => t.topic).join(', ') || '(none)');
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resetDir(dir) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

function copyKinds(srcBase, topic) {
  for (const kind of ['content', 'roadmaps']) {
    const src = join(srcBase, kind);
    const dst = join(ROOT, 'src', kind, topic);
    resetDir(dst);
    if (existsSync(src)) {
      cpSync(src, dst, { recursive: true });
    }
    // keep the (otherwise gitignored) dir tracked so the glob base exists
    writeFileSync(join(dst, '.gitkeep'), '');
  }
}

// ---------------------------------------------------------------------------
// Sync implementations
// ---------------------------------------------------------------------------

function syncFromGitHub({ topic, repo, branch }) {
  const tmp = mkdtempSync(join(tmpdir(), `opensdeprep-${topic}-`));
  try {
    console.log(`→ ${topic}: cloning ${repo}#${branch}`);
    execFileSync(
      'git',
      ['clone', '--depth', '1', '--branch', branch, `https://github.com/${repo}.git`, tmp],
      { stdio: ['ignore', 'ignore', 'inherit'] },
    );
    copyKinds(tmp, topic);
    console.log(`✓ ${topic}: synced from GitHub (${repo})`);
  } catch (err) {
    console.error(`✗ ${topic}: ${err.message.split('\n')[0]}`);
    process.exitCode = 1;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

function syncFromLocal({ topic, localPath }) {
  if (!existsSync(localPath)) {
    console.error(`✗ ${topic}: local path does not exist: ${localPath}`);
    process.exitCode = 1;
    return;
  }
  try {
    console.log(`→ ${topic}: copying from local path ${localPath}`);
    copyKinds(localPath, topic);
    console.log(`✓ ${topic}: synced from local path`);
  } catch (err) {
    console.error(`✗ ${topic}: ${err.message.split('\n')[0]}`);
    process.exitCode = 1;
  }
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

for (const t of targets) {
  if (t.localPath) {
    syncFromLocal(t);
  } else {
    syncFromGitHub(t);
  }
}
