# packages

Reusable application and tooling packages. Application capabilities consumed by `apps/*`
live here, alongside the shared tool configuration under `packages/tooling/*`.

`packages/client`, `packages/server` and `packages/shared` are empty placeholders in this
template — a consumer of the template fills them with their own code. `packages/tooling/*`
ships as part of the template itself.

Per this repo's `AGENTS.md`: `packages/*` never depend on `apps/*` or `services/*`, and
`packages/shared` holds contracts, not a dumping ground for utilities.
