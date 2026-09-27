---
'@figentra/playwright-config': minor
'@figentra/vitest-config': patch
'@figentra/oxlint-config': patch
'@figentra/typescript-config': patch
'@figentra/tsdown-config': patch
---

Add `@figentra/playwright-config`, a shared Playwright base preset, and remove the broken root
`playwright.config.ts` (it pointed at `apps/console`, which does not exist as a live workspace app).
Playwright config now lives with whichever app ships e2e tests, following the existing
`packages/tooling/{oxlint,typescript,vitest,tsdown}` preset pattern.

Mark all five tooling preset packages publishable: drop `private: true`, add
`publishConfig.access: "public"` and a `repository` field so they publish cleanly to npm under the
`@figentra/*` scope.
