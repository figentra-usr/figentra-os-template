# api

A stub Encore.ts-style service scaffold, not yet wired to a real runtime. `bootstrap/application.ts`
exports a `bootstrap()` that only reads `config/` and returns — a comment on it says
explicitly that runtime initialization is added once the Figentra runtime package is
installed, and until then the service stays empty by design. `src/main.ts` just calls
`bootstrap()`.

`config/` holds one file per concern (`app`, `auth`, `cache`, `database`, `events`,
`logging`, `metrics`, `queue`, `realtime`, `scheduler`, `tracing`, `workflow`) — configuration
surface area is scaffolded ahead of the capabilities that will read it.

`package.json` wires the standard `dev`/`build`/`start` scripts through the Figentra CLI
(`figentra dev|build|start`) plus `lint`/`format`/`test` through oxlint/oxfmt/Vitest.

Populated by the Figentra CLI when a service is created, then extended by a developer.
