import { defineConfig } from 'vitest/config';

export const figentraVitest = defineConfig({
  test: {
    globals: true,
    passWithNoTests: true,
    coverage: { provider: 'v8', reporter: ['text', 'json', 'html'] },
  },
});

export default figentraVitest;
