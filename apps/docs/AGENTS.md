# @figentra/docs — agent guidance

- **Purpose:** the canon. Architecture plan, standards, runbooks, ADRs, product blueprints.
- **Owns:** `apps/docs/src/**` (content) and `apps/docs/scripts/**`. Navigation is generated (`pnpm --filter @figentra/docs nav`); never hand-edit `src/docs.json#navigation`.
- **Invariants:** an ADR is never deleted, only superseded (header `**Superseded by:**`); numbers are continuous (next ≥ 0152); `platform/architecture-plan.md` is the current authority; `legacy/**` is read-only context.
- **How to add a page:** drop a `.md` with `title`/`description` frontmatter into the right folder and run `pnpm nav`.
- **Test:** `pnpm --filter @figentra/docs test` (nav is current) · `build` (no broken links).
- **PII:** none. Never paste secrets, tokens, or personal data into docs.
