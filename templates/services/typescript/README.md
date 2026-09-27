# services/typescript

The TypeScript service template the Figentra CLI scaffolds a new `services/*` workspace
from. Its `bootstrap/`, `config/`, `src/` and `package.json` mirror `services/api` exactly
— a stub service whose `bootstrap()` only reads `config/` and returns, waiting on the
Figentra runtime package before any business logic is added.

Populated by whoever maintains this template's scaffolding; kept in sync with
`services/api` by hand today, not by a generator.
