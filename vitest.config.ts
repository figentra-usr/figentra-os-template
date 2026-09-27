// Purpose: root Vitest "workspace" runner — `pnpm test` at the root fans out to every workspace's
// own vite.config.ts/vitest.config.ts via the `projects` glob below, rather than each workspace
// needing its own top-level test invocation wired into turbo.jsonc.
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Every workspace with a Vite or Vitest config becomes a test project.
    projects: ['{apps,services,packages,packages/tooling}/*/{vite,vitest}.config.ts'],
    // A workspace with no tests yet (or ever) shouldn't fail the aggregate root run.
    passWithNoTests: true,
  },
});
