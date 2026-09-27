# services

Deployable services/processes. Per root `AGENTS.md`, a service is created only through the
Figentra CLI, not hand-scaffolded — the CLI seeds it from `templates/services/*`.

`services/api` is the one example currently checked in: a stub TypeScript service with no
business logic yet, waiting on the Figentra runtime package.

Populated by a developer running the Figentra CLI's `create`/`dev` workflows.
