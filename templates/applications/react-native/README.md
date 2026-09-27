# react-native

Scaffolded with `create-expo-app@5.0.2` (Expo SDK 57, `default` template). This is a
template starting point only — a bootstrap shell with no business logic, per this
repo's `apps/` convention.

## Linting

Expo SDK 57's `default` template does not scaffold any lint config or `lint` script.
This template uses `oxlint` (`pnpm lint`), the same tool as every other workspace
member and template — oxlint handles Expo/React Native's TypeScript+JSX code fine,
so there was no need to reach for `eslint-config-expo`.

This folder is outside the root pnpm workspace (it's copied out by the Figentra CLI,
not consumed via `workspace:*`), so it can't depend on `@figentra/oxlint-config`.
`.oxlintrc.json` here is a standalone copy of the relevant rules from
`packages/tooling/oxlint/{base,react,native}.json` — keep it in sync by hand until
`@figentra/oxlint-config` is published to npm, at which point this should switch to
consuming the published package instead.
