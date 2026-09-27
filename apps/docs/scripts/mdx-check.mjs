/**
 * Figentra file contract:
 * Purpose: compile every page under src/ with the MDX compiler Mintlify uses, so a parse error (a bare `<` or `{` in
 *          prose, an unclosed tag, a pipe inside a table cell) fails `pnpm build` locally and in CI with the full list in one
 *          run — `mint broken-links` stops at the first broken page. Exit 1 when any page fails.
 * Owner: docs-governance · Secrets: forbidden
 */
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const root = new URL("../src", import.meta.url).pathname.replace(/\/$/, "");
const out = [];
function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) {
      if (f !== "node_modules") walk(p);
    } else if (/\.mdx?$/.test(f)) out.push(p);
  }
}
walk(root);
let bad = 0;
for (const p of out) {
  try {
    await compile(readFileSync(p, "utf8"), {
      remarkPlugins: [remarkFrontmatter, remarkGfm],
      format: "mdx",
    });
  } catch (e) {
    bad++;
    console.log(
      p.replace(root + "/", ""),
      "-",
      String(e.reason ?? e.message).split("\n")[0],
      "@",
      e.line + ":" + e.column,
    );
  }
}
console.log(`${out.length - bad}/${out.length} pages parse${bad ? ` — ${bad} failing` : ""}`);
process.exit(bad ? 1 : 0);
