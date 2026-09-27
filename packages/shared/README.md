# @figentra/shared (placeholder)

Intentionally empty in this template. This is the placeholder location where a consumer
of the Figentra OS template implements their own isomorphic shared code — contracts,
schemas, and types used by both client and server.

Per root `AGENTS.md`: "`packages/shared` holds contracts, not a dumping ground for
utilities" — keep it to the boundary types both sides agree on.

The template itself does not ship example business logic here; only the shared
tooling/config packages under `packages/tooling/*` are part of the published product.
Populated by a human developer building on top of this template, not by a generator.
