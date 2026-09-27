# figentra

Figentra application monorepo.

## Layout

```text
apps/       executable application runtimes
services/   deployable services / processes
packages/   reusable application and tooling packages
templates/  scaffolding sources for new apps/services/packages
.figentra/  Figentra machine state, generated metadata and AI context
```

## Getting started

```bash
mise install
pnpm install
pnpm dev
```

## Commands

| Command               | Purpose                                    |
| --------------------- | ------------------------------------------ |
| `pnpm dev`            | Run workspaces in development              |
| `pnpm check`          | Format check, lint, typecheck, test, build |
| `pnpm test`           | Unit tests (Vitest)                        |
| `pnpm knip`           | Unused files, exports and dependencies     |
| `pnpm licenses:check` | License-compliance gate on prod deps       |
| `pnpm changeset`      | Prepare a release note                     |

Browser tests (Playwright) live per-app, extending the shared `@figentra/playwright-config`
preset — see `packages/tooling/playwright/README.md`.

The Figentra CLI (`figentra dev | lint | test | build | check | release | env`) will own these workflows;
Turborepo coordinates workspace tasks underneath.
