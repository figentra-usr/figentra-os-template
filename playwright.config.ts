// Purpose: root Playwright E2E config (`pnpm test:e2e`). Targets a single console-style app;
// see the "no apps/console" note in this repo's final report if this template hasn't scaffolded
// that app yet — testDir/webServer below assume it exists.
import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env.CI);

export default defineConfig({
  testDir: 'apps/console/e2e',
  // Fail CI on a lingering `.only()` so a debug-only test run never merges as a passing suite.
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:5173',
    // Only capture a trace on the first retry of a failing test — full traces on every run are expensive.
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm --filter @figentra/console dev',
    url: 'http://localhost:5173',
    // Locally, reuse a dev server already running; CI always starts a fresh one.
    reuseExistingServer: !isCI,
  },
});
