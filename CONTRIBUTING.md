# Contributing

1. Install tools: `mise install`, then `pnpm install`.
2. Create a branch from `main`.
3. Make the change. Keep business logic in `packages/`, not in `apps/`.
4. Run `pnpm check`.
5. If a published package changed, add a changeset: `pnpm changeset`.
6. Commit using Conventional Commits (`feat:`, `fix:`, `chore:` …). Hooks run format, lint and secret checks.
7. Open a pull request. CI must be green and a code owner must approve.
