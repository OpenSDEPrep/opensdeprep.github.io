#!/usr/bin/env node
// Local content sync: clones each configured topic repo and copies its
// `content/` and `roadmaps/` into src/. Topic repos are the single source of
// truth — synced dirs are gitignored (see .gitignore). CI does the equivalent
// via checkout + rsync in .github/workflows/sync-and-deploy.yml.
//
// Usage:  npm run sync            (all configured topics)
//         npm run sync -- lld     (one or more topics)

import { execFileSync } from 'node:child_process';
import { cpSync, rmSync, mkdirSync, existsSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Topic repos that currently exist. Add entries as repos come online. */
const TOPIC_REPOS = [
  { topic: 'lld', repo: 'OpenSDEPrep/lld', branch: 'main' },
  // { topic: 'dsa', repo: 'OpenSDEPrep/dsa', branch: 'main' },
];

const only = process.argv.slice(2);
const targets = only.length ? TOPIC_REPOS.filter((t) => only.includes(t.topic)) : TOPIC_REPOS;

if (targets.length === 0) {
  console.log('Nothing to sync. Configured topics:', TOPIC_REPOS.map((t) => t.topic).join(', ') || '(none)');
  process.exit(0);
}

function resetDir(dir) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}

function syncTopic({ topic, repo, branch }) {
  const tmp = mkdtempSync(join(tmpdir(), `opensdeprep-${topic}-`));
  try {
    console.log(`→ ${topic}: cloning ${repo}#${branch}`);
    execFileSync(
      'git',
      ['clone', '--depth', '1', '--branch', branch, `https://github.com/${repo}.git`, tmp],
      { stdio: ['ignore', 'ignore', 'inherit'] },
    );

    for (const kind of ['content', 'roadmaps']) {
      const src = join(tmp, kind);
      const dst = join(ROOT, 'src', kind, topic);
      resetDir(dst);
      if (existsSync(src)) {
        cpSync(src, dst, { recursive: true });
      }
      // keep the (otherwise gitignored) dir tracked so the glob base exists
      writeFileSync(join(dst, '.gitkeep'), '');
    }
    console.log(`✓ ${topic}: synced`);
  } catch (err) {
    console.error(`✗ ${topic}: ${err.message.split('\n')[0]}`);
    process.exitCode = 1;
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

for (const t of targets) syncTopic(t);
