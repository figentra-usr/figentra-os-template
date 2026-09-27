# @figentra/playwright-config

Shared Playwright base config — every workspace with e2e tests imports `figentraPlaywright` from
this package and extends it with its own `testDir`, `webServer` and browser `projects`, instead of
hand-rolling retries/reporter/trace settings per app.

Root `playwright.config.ts` was removed: Playwright config lives with the app that has e2e tests,
not floating at the monorepo root pointing at an app that doesn't exist yet. No workspace in this
template currently ships e2e tests, so no `playwright.config.ts` exists elsewhere yet either — the
next app that adds Playwright coverage should depend on this package and follow the pattern below.

```ts
// apps/<app>/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import { figentraPlaywright } from '@figentra/playwright-config';

export default defineConfig({
  ...figentraPlaywright,
  testDir: './e2e',
  use: { ...figentraPlaywright.use, baseURL: 'http://localhost:3000' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

Exports: see `package.json` `exports`.
