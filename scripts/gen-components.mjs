#!/usr/bin/env node
// scripts/gen-components.mjs
//
// Regenerates COMPONENTS.toon: every component, its tier, its runtime and the
// exact list of files that import it.
//
// COMPONENTS.toon is GENERATED. Hand-editing it is pointless — the next run
// overwrites it. Change the code, then re-run:
//
//     npm run components:map
//
// It runs on every commit via .githooks/pre-commit. See BIBLE.md.
//
// Usage:
//   node scripts/gen-components.mjs          rewrite COMPONENTS.toon
//   node scripts/gen-components.mjs --check  exit 1 if the file is out of date

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'COMPONENTS.toon');
const CODE = /\.(tsx|ts|jsx|js)$/;

/** Every file under src/, as a repo-relative POSIX path. */
function walk(dir, acc = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, acc);
    else acc.push(full);
  }
  return acc;
}

const posix = (p) => relative(ROOT, p).split(sep).join('/');
const allFiles = walk(SRC).map(posix);
const codeFiles = allFiles.filter((f) => CODE.test(f));

/**
 * Resolve an import specifier to a repo-relative file path, mirroring the
 * tsconfig "@/*" -> "./src/*" alias plus Node/TS extension and index lookup.
 */
function resolveImport(spec, fromFile) {
  let base;
  if (spec.startsWith('@/')) base = 'src/' + spec.slice(2);
  else if (spec.startsWith('.')) base = posix(resolve(dirname(join(ROOT, fromFile)), spec));
  else return null; // bare package specifier

  const candidates = [
    base,
    ...['.tsx', '.ts', '.jsx', '.js', '.css'].map((e) => base + e),
    ...['index.tsx', 'index.ts', 'index.jsx'].map((e) => base + '/' + e),
  ];
  return candidates.find((c) => allFiles.includes(c)) ?? null;
}

// Two narrow passes beat one clever one. A single regex with a lazy [\s\S]*?
// reaching for the next `from` silently swallowed side-effect imports such as
// `import './MainNav.css'`, which is why three stylesheets read as unused.
const FROM_RE = /\bfrom\s*['"]([^'"]+)['"]/g;
const BARE_RE = /^[ \t]*import\s*['"]([^'"]+)['"]/gm;

/** target file -> Set of files importing it */
const consumers = new Map();
for (const file of codeFiles) {
  const text = readFileSync(join(ROOT, file), 'utf8');
  for (const m of [...text.matchAll(FROM_RE), ...text.matchAll(BARE_RE)]) {
    const target = resolveImport(m[1], file);
    if (!target || target === file) continue;
    if (!consumers.has(target)) consumers.set(target, new Set());
    consumers.get(target).add(file);
  }
}

/** common | shared | features/<area> */
function tierOf(file) {
  const rest = file.replace('src/components/', '');
  if (rest.startsWith('common/')) return 'common';
  if (rest.startsWith('shared/')) return 'shared';
  if (rest.startsWith('features/')) return 'features/' + rest.split('/')[1];
  return 'unsorted';
}

function runtimeOf(file) {
  if (file.endsWith('.css')) return 'css';
  const head = readFileSync(join(ROOT, file), 'utf8').split('\n').slice(0, 4).join('\n');
  if (/^\s*['"]use client['"]/m.test(head)) return 'client';
  return /\.(tsx|jsx)$/.test(file) ? 'server' : 'module';
}

/**
 * A barrel is an index file that does nothing but re-export. A component whose
 * only consumer is a barrel is dead in practice however healthy its count
 * looks: the barrel re-exports it, but nothing on a page renders it.
 */
function isBarrel(file) {
  if (!/\/index\.tsx?$/.test(file)) return false;
  return readFileSync(join(ROOT, file), 'utf8')
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('//'))
    .every((l) => /^\s*export\s/.test(l));
}

const q = (s) => (/[,"\s]/.test(s) ? '"' + s.replace(/"/g, "'") + '"' : s);

const rows = allFiles
  .filter((f) => f.startsWith('src/components/'))
  .sort()
  .map((file) => {
    const used = [...(consumers.get(file) ?? [])].sort();
    return {
      file,
      path: file.replace('src/components/', ''),
      tier: tierOf(file),
      runtime: runtimeOf(file),
      lines: readFileSync(join(ROOT, file), 'utf8').split('\n').length,
      used_by: used.length,
      consumers: used,
    };
  });

const areas = [...new Set(rows.map((r) => r.tier))].sort();

/** The identifiers a module exports, so a barrel re-export can be traced. */
function exportNames(file) {
  const text = readFileSync(join(ROOT, file), 'utf8');
  const names = new Set();
  for (const m of text.matchAll(/export\s+(?:async\s+)?(?:function|const|class)\s+(\w+)/g))
    names.add(m[1]);
  for (const m of text.matchAll(/export\s+default\s+(?:function\s+)?(\w+)/g)) names.add(m[1]);
  return [...names];
}

/**
 * Being re-exported by a barrel is not by itself death: `nav/index.tsx` is a
 * barrel, and layout.tsx really does render what it re-exports. What IS death
 * is a barrel re-export that nobody ever pulls the symbol out of. So for a
 * barrel-only component, check whether any importer of that barrel actually
 * names one of its exports.
 */
function reachedThroughBarrel(row) {
  const names = exportNames(row.file);
  if (!names.length) return true; // cannot prove it dead; stay quiet
  for (const barrel of row.consumers) {
    const barrelDir = dirname(barrel);
    for (const f of codeFiles) {
      if (f === barrel) continue;
      const text = readFileSync(join(ROOT, f), 'utf8');
      for (const m of text.matchAll(FROM_RE)) {
        if (resolveImport(m[1], f) !== barrel) continue;
        const clause = text.slice(Math.max(0, m.index - 300), m.index);
        if (names.some((n) => new RegExp('[{,\\s]' + n + '[\\s,}]').test(clause))) return true;
      }
    }
    void barrelDir;
  }
  return false;
}

const orphans = rows
  .filter((r) => r.runtime !== 'css')
  .map((r) => {
    if (r.used_by === 0) return { ...r, why: 'zero importers - delete or wire up' };
    if (r.consumers.every(isBarrel) && !reachedThroughBarrel(r))
      return { ...r, why: 're-exported by a barrel that nobody pulls it from - dead' };
    return null;
  })
  .filter(Boolean);

const d = new Date();
const pad = (n) => String(n).padStart(2, '0');
const stamp = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const L = [];
L.push('meta:');
L.push('  file: COMPONENTS.toon');
L.push('  purpose: "Every component, its tier, and every file that imports it. Read with BIBLE.md and STYLING.toon."');
L.push('  format: TOON');
L.push('  generated_by: scripts/gen-components.mjs');
L.push('  hand_edit: NEVER - regenerate with `npm run components:map`');
L.push(`  generated: ${stamp}`);
L.push('  refresh: "Runs on every commit via .githooks/pre-commit. Enable once with: git config core.hooksPath .githooks"');
L.push('  consumers_note: "Paths are repo-relative. A component listed against only an index.tsx barrel appears in orphans."');
L.push('');

L.push('tiers:');
L.push('  rule: "Imports flow one way: features -> shared -> common. A features/ component NEVER imports from another features/ area. If two areas need it, promote it to shared/."');
L.push('  common: "Mounted by app/layout.tsx, so it is on every page. nav, Footer, ab overlay."');
L.push('  shared: "Imported by 2+ DIFFERENT feature areas. That promotion is the ONLY reason a component lives here."');
L.push('  features: "One feature area only. Two consumers inside the same area still counts as one area."');
L.push('  route_local: "app/events/[eventId]/LiveEvent.tsx and app/admin/AdminPanel.tsx are page bodies, not components. They stay beside their route and are not listed here."');
L.push('');

L.push('totals[5]{metric,value}:');
L.push(`  component_files,${rows.length}`);
L.push(`  client,${rows.filter((r) => r.runtime === 'client').length}`);
L.push(`  server,${rows.filter((r) => r.runtime === 'server').length}`);
L.push(`  css,${rows.filter((r) => r.runtime === 'css').length}`);
L.push(`  orphans,${orphans.length}`);
L.push('');

for (const area of areas) {
  const set = rows.filter((r) => r.tier === area);
  if (!set.length) continue;
  L.push(`${area.replace(/[/-]/g, '_')}[${set.length}]{file,runtime,lines,used_by,consumers}:`);
  for (const r of set) {
    const list = r.consumers.length
      ? q(r.consumers.map((c) => c.replace('src/', '')).join(' '))
      : '-';
    L.push(`  ${q(r.path)},${r.runtime},${r.lines},${r.used_by},${list}`);
  }
  L.push('');
}

L.push(`orphans[${orphans.length}]{file,tier,note}:`);
for (const r of orphans) L.push(`  ${q(r.path)},${q(r.tier)},${q(r.why)}`);
L.push('');

const out = L.join('\n');
const existing = (() => {
  try {
    return readFileSync(OUT, 'utf8');
  } catch {
    return null;
  }
})();

if (process.argv.includes('--check')) {
  if (existing !== out) {
    console.error('COMPONENTS.toon is out of date. Run: npm run components:map');
    process.exit(1);
  }
  console.log('COMPONENTS.toon is up to date.');
} else {
  writeFileSync(OUT, out, 'utf8');
  console.log(`COMPONENTS.toon written - ${rows.length} components, ${orphans.length} orphans.`);
}
