import { defineConfig } from 'vitest/config';

// Cannot import @figentra/vitest-config's preset here: that package depends on this one
// (for its own tsconfig), so importing it back would create a cyclic workspace dependency.
// Kept in sync with packages/tooling/vitest/vitest.ts by hand.
export default defineConfig({
  test: {
    globals: true,
    passWithNoTests: true,
    coverage: { provider: 'v8', reporter: ['text', 'json', 'html'] },
  },
});
