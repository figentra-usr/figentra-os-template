import type { PlaywrightTestConfig } from '@playwright/test';

const isCI = Boolean(process.env.CI);

/**
 * Shared Playwright base — a consuming app's own `playwright.config.ts` spreads this into
 * `defineConfig({ ...figentraPlaywright, testDir, webServer, projects, ... })` and adds only what
 * is specific to that app (test directory, dev server command, base URL, browser projects).
 *
 * This is data, not a `defineConfig()` call: `defineConfig()` must run in the consuming app so
 * Playwright resolves `testDir`/`webServer` relative to that app's own config file location.
 */
export const figentraPlaywright: PlaywrightTestConfig = {
  // Fail CI on a lingering `.only()` so a debug-only test run never merges as a passing suite.
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? 'github' : 'list',
  use: {
    // Only capture a trace on the first retry of a failing test — full traces on every run are expensive.
    trace: 'on-first-retry',
  },
};

export default figentraPlaywright;
