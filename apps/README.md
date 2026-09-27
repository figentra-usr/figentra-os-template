# apps

Executable application runtimes — the composition/bootstrap shells that wire installed
packages together and start a running process. Per this repo's `AGENTS.md`, an app holds
no business logic; capabilities live in `packages/` and are assembled here.

Populated by a developer using the Figentra CLI to scaffold a new app from
`templates/applications/*`. Empty in this template by design — the OS documentation
app (`apps/docs`) lives in the product repo generated from this template, not here.

`apps/*` may depend on `packages/*`; it must never depend on `services/*`.
