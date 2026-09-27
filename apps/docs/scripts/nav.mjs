#!/usr/bin/env node
/**
 * Figentra file contract:
 * Purpose: generate the `navigation` block of src/docs.json from the directory tree so the nav can
 *          never drift from the files. Folder order and labels are declared in SECTIONS below;
 *          everything else is discovered. `--check` fails if docs.json is stale (CI).
 * Owner: docs-governance
 * Secrets: forbidden
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Content root: apps/docs/src — Mintlify's "root directory" setting points here, so page ids are src-relative.
const root = resolve(fileURLToPath(new URL("../src", import.meta.url)));
const check = process.argv.includes("--check");

/** Tab → groups (folder → label). Order here is the order in the sidebar. */
const SECTIONS = [
  {
    tab: "Platform",
    groups: [
      ["platform", "Architecture"],
      ["engineering/standards", "Standards"],
      ["engineering/system", "Engineering system"],
      ["engineering", "Engineering"],
      ["runbooks", "Runbooks"],
    ],
  },
  {
    tab: "Products",
    groups: [
      ["products", "Products"],
      ["plans", "Plans"],
    ],
  },
  {
    tab: "Company",
    groups: [
      ["company", "Company"],
      ["compliance", "Compliance"],
      ["legal", "Legal"],
    ],
  },
  { tab: "Decisions", groups: [["adr", "ADRs"]] },
  { tab: "Legacy", groups: [["legacy", "Superseded"]] },
];

const isPage = (f) => /\.(md|mdx)$/.test(f);
const pageId = (p) => p.replace(/\.(md|mdx)$/, "");
const label = (name) =>
  name
    .replace(/^\d+-/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/** Pages of a folder: README/index first, then files A–Z, then sub-folders as nested groups. */
function pagesOf(dir, skip = new Set()) {
  const abs = join(root, dir);
  let entries;
  try {
    entries = readdirSync(abs).filter((e) => !e.startsWith("."));
  } catch {
    return [];
  }
  const files = entries
    .filter((e) => isPage(e) && statSync(join(abs, e)).isFile())
    .sort((a, b) =>
      /^(README|index)\./i.test(a) ? -1 : /^(README|index)\./i.test(b) ? 1 : a.localeCompare(b),
    );
  const dirs = entries.filter(
    (e) => statSync(join(abs, e)).isDirectory() && !skip.has(join(dir, e)),
  );
  const pages = files.map((f) => pageId(join(dir, f)));
  for (const d of dirs) {
    const sub = pagesOf(join(dir, d), skip);
    if (sub.length) pages.push({ group: label(d), pages: sub });
  }
  return pages;
}

const claimed = new Set(SECTIONS.flatMap((s) => s.groups.map(([dir]) => dir)));
const tabs = SECTIONS.map(({ tab, groups }) => ({
  tab,
  groups: groups
    .map(([dir, group]) => ({
      group,
      pages: pagesOf(
        dir,
        new Set([...claimed].filter((c) => c !== dir && c.startsWith(dir + "/"))),
      ),
    }))
    .filter((g) => g.pages.length),
}));
tabs[0].groups.unshift({ group: "Start", pages: ["index"] });

const docsJsonPath = join(root, "docs.json");
const current = JSON.parse(readFileSync(docsJsonPath, "utf8"));
const next = { ...current, navigation: { tabs } };
const nextText = JSON.stringify(next, null, 2) + "\n";
if (check) {
  if (JSON.stringify(current.navigation) !== JSON.stringify(next.navigation)) {
    console.error("docs.json navigation is stale — run `pnpm --filter @figentra/docs nav`");
    process.exit(1);
  }
  console.log("docs.json navigation is current");
} else {
  writeFileSync(docsJsonPath, nextText);
  const count = JSON.stringify(tabs).match(/"[^"]+\/[^"]+"/g)?.length ?? 0;
  console.log(`docs.json: ${tabs.length} tabs, ${count} pages`);
}
