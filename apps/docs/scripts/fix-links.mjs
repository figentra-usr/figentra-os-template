/**
 * Figentra file contract:
 * Purpose: rewrite the links in the pages ported from the Laravel monorepo to Mintlify form. Mintlify links are
 *          root-relative and extension-less (`/runbooks/rollback`), the old docs used file-relative `.md` links
 *          (`rollback.md`, `../../.docs/adr/0032-*.md`) and repository paths (`../../.kiro/steering/*.md`,
 *          `../../terraform/envs/prd/mobile.tf`). Rules, in order:
 *            1. a target that resolves to a page under src/ (relative to the page, `.md`/`.mdx` stripped, or by
 *               unique basename anywhere in the tree) → `/path[#anchor]`;
 *            2. a `.kiro/**` target (the old planning/steering tree, superseded by ADRs and the architecture plan)
 *               → the link text alone;
 *            3. any other repository path (source files, schemas, workflows, brand assets) → the path as inline
 *               code, so the reference survives without a dead link;
 *            4. `http(s)`, `mailto:` and links already root-relative to an existing page are left alone.
 *          Code fences and inline code are never touched. `--check` prints what would change and exits 1 when
 *          anything would; the default rewrites in place and prints a summary plus the targets it could not resolve.
 * Owner: docs-governance · Secrets: forbidden
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, posix, relative } from 'node:path';

const ROOT = new URL('../src', import.meta.url).pathname.replace(/\/$/, '');
const check = process.argv.includes('--check');

/** Every page as its Mintlify path (`adr/0032-six-service-split`). */
const pages = [];
(function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (entry !== 'node_modules' && entry !== 'public') walk(full);
    } else if (/\.mdx?$/.test(entry)) {
      pages.push(relative(ROOT, full).replace(/\.mdx?$/, ''));
    }
  }
})(ROOT);
const pageSet = new Set(pages);
const byBasename = new Map();
for (const page of pages) {
  const key = basename(page);
  byBasename.set(key, byBasename.has(key) ? null : page); // null = ambiguous
}

const LINK = /(!?)\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)/g;
const DEFINITION = /^(\[[^\]]+\]:\s*)(\S+)(.*)$/;

const summary = { pages: 0, rewritten: 0, unlinkedKiro: 0, inlined: 0, unresolved: [] };

function resolveTarget(pageDir, target) {
  const [path, anchor = ''] = target.split(/(?=#)/);
  if (path === '') return null; // same-page anchor
  if (/^(https?:|mailto:|tel:)/.test(path)) return null;
  const suffix = anchor;
  if (path.startsWith('/')) {
    const clean = path
      .replace(/^\//, '')
      .replace(/\.mdx?$/, '')
      .replace(/\/$/, '');
    if (pageSet.has(clean)) return null; // already valid
    if (pageSet.has(`${clean}/index`)) return { kind: 'page', to: `/${clean}/index${suffix}` };
  }
  const joined = posix
    .normalize(posix.join(pageDir, path))
    .replace(/\.mdx?$/, '')
    .replace(/\/$/, '');
  if (pageSet.has(joined)) return { kind: 'page', to: `/${joined}${suffix}` };
  if (pageSet.has(`${joined}/index`)) return { kind: 'page', to: `/${joined}/index${suffix}` };
  const base = basename(path).replace(/\.mdx?$/, '');
  const unique = byBasename.get(base);
  if (unique && /\.mdx?$/.test(path)) return { kind: 'page', to: `/${unique}${suffix}` };
  if (/(^|\/)\.kiro\//.test(path)) return { kind: 'kiro' };
  return { kind: 'file', path };
}

function rewriteLine(line, pageDir, file) {
  const definition = DEFINITION.exec(line);
  if (definition) {
    const [, head, target, tail] = definition;
    const r = resolveTarget(pageDir, target);
    if (r?.kind === 'page') {
      summary.rewritten++;
      return `${head}${r.to}${tail}`;
    }
    if (r) summary.unresolved.push(`${file}: ${target}`);
    return line;
  }
  // Never rewrite inside an inline code span (`path/in/code.md`); link *text* in code is fine.
  const spans = [];
  for (const m of line.matchAll(/`[^`]*`/g)) spans.push([m.index, m.index + m[0].length]);
  const inCode = (i) => spans.some(([a, b]) => i >= a && i < b);
  return line.replace(LINK, (whole, bang, text, target, title = '', offset) => {
    if (bang || inCode(offset)) return whole;
    const r = resolveTarget(pageDir, target);
    if (!r) return whole;
    if (r.kind === 'page') {
      summary.rewritten++;
      return `[${text}](${r.to}${title})`;
    }
    if (r.kind === 'kiro') {
      summary.unlinkedKiro++;
      return text;
    }
    summary.inlined++;
    const shown = r.path.replace(/^(\.\.\/)+/, '');
    const bare = text.replace(/^`|`$/g, '');
    return bare && bare !== r.path && bare !== shown ? `${text} (\`${shown}\`)` : `\`${shown}\``;
  });
}

const changed = [];
for (const page of pages) {
  const file = join(ROOT, `${page}.md`);
  let source;
  try {
    source = readFileSync(file, 'utf8');
  } catch {
    continue; // .mdx pages: none today
  }
  const pageDir = dirname(page) === '.' ? '' : dirname(page);
  let fence = false;
  const out = source.split('\n').map((line) => {
    if (/^\s*(```|~~~)/.test(line)) {
      fence = !fence;
      return line;
    }
    return fence ? line : rewriteLine(line, pageDir, page);
  });
  const next = out.join('\n');
  if (next !== source) {
    changed.push(page);
    if (!check) writeFileSync(file, next);
  }
}
summary.pages = changed.length;

const verb = check ? 'would rewrite' : 'rewrote';
console.log(
  `fix-links: ${verb} ${summary.rewritten} link(s) to pages, unlinked ${summary.unlinkedKiro} .kiro reference(s), inlined ${summary.inlined} repository path(s) across ${summary.pages} page(s)`,
);
if (summary.unresolved.length) {
  console.log('unresolved reference-style definitions:');
  for (const item of summary.unresolved) console.log(`  ${item}`);
}
if (check && changed.length) process.exit(1);
