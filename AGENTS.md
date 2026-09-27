# AGENTS.md

Instructions for AI coding agents working in this repository.

## Architecture

- `apps/` — executable application runtimes. An app is a composition/bootstrap shell; no business logic.
- `services/` — deployable services/processes. Created only through the Figentra CLI.
- `packages/` — reusable application and tooling packages. Application capabilities live here.
- `.figentra/` — Figentra-owned machine state, generated metadata and AI context. Not source code.
- There is no `modules/` directory.

## Boundaries

- `apps/*` may depend on `packages/*`; `packages/*` never depend on `apps/*` or `services/*`.
- `packages/shared` holds contracts, not a dumping ground for utilities.
- Shared tool configuration lives in `packages/tooling/*`; per-workspace config only when required.

## Generated files

- Generated output goes to `.figentra/generated/`. Never hand-edit it.
- `.figentra/docs/` is machine-maintained documentation derived from the application model.

## Tooling

- Package manager: pnpm. Task runner: Turborepo. Versions: `mise.toml`.
- Format: oxfmt. Lint: oxlint. Tests: Vitest. E2E: Playwright. Hygiene: Knip.
- Before finishing: `pnpm check`.
- Commits follow Conventional Commits (commitlint). Releases use Changesets.

## Forbidden

- ESLint or Prettier configuration.
- `.env.staging`, `.env.production`, or any committed environment values.
- Secrets in files, tests, fixtures, logs or commit messages.
- Dockerfiles, Makefiles, shell scripts, Go workspaces, or provider-specific IaC in this template.
- Business logic in `apps/`.

## Source of truth

- Application configuration: `figentra.config.ts`.
- Environment values: process environment, local `.env.local`, Infisical or Doppler — selected through the Figentra CLI.
- Workflows (create, dev, validate, build, test, release, env, deploy): the Figentra CLI.
