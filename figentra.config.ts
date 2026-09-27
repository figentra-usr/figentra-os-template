// Purpose: application configuration — the source of truth named in AGENTS.md's "Source of truth"
// section. The Figentra CLI (dev/lint/test/build/check/release/env) reads this to know what to run.
// Owner: whichever team owns this application instance (not release-operations — this file is
// app-specific, unlike the root/* tooling configs).
import { defineConfig } from '@figentra/config';

export default defineConfig({
  // application configuration
});
