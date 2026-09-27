# AGENTS — @figentra/playwright-config

- Owner: release-operations (dependency-steward for version bumps).
- Do not add options in a consuming workspace; change the preset and ship a changeset.
- Playwright config lives with the app that has e2e tests, not at the monorepo root — a consuming
  app's `playwright.config.ts` imports `figentraPlaywright` from this package and extends it with
  its own `testDir`/`webServer`/`projects`.
- Secrets: forbidden.
