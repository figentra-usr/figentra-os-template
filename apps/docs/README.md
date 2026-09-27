# @figentra/docs

Mintlify docs-as-code. Content is plain Markdown/MDX under **`src/`** (set `apps/docs/src` as the root directory in Mintlify hosting); `src/docs.json` navigation is **generated** by
`scripts/nav.mjs` (`pnpm nav`) — declare folder order and labels in its `SECTIONS`, never edit the nav by hand.

```bash
pnpm --filter @figentra/docs dev     # regenerates nav, serves on :3333 (mint runs via npx; not a workspace dependency)
pnpm --filter @figentra/docs build   # nav + MDX parse check on every page + broken-link check (CI)
pnpm --filter @figentra/docs test    # nav up to date, MDX parses, links already in Mintlify form
pnpm --filter @figentra/docs links   # broken-link report only
pnpm --filter @figentra/docs fix-links   # rewrite file-relative `.md` / repo-path links to Mintlify form
```

**Links** are root-relative and extension-less (`/runbooks/rollback`, `/adr/0032-six-service-split#context`).
`scripts/fix-links.mjs` converts the old file-relative form and turns references to repository files that are
not pages into inline code; `--check` (part of `test`) fails when a page still carries the old form.
`scripts/mdx-check.mjs` compiles every page with the MDX compiler Mintlify uses, so a bare `<` or `{` in prose,
an unclosed tag or a `|` inside a table-cell code span fails locally with the full list, not one page per run
(write `&lt;`, `\{`, `\|`).

Hosting: Mintlify (GitLab app on this repo, root directory `apps/docs/src`). Hosted sites expose `llms.txt`,
`llms-full.txt` and an MCP endpoint at `<docs-domain>/mcp` automatically. Switching to GitBook would mean
replacing `docs.json` with `.gitbook.yaml` — content is vendor-neutral.
