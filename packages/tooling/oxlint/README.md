# @figentra/oxlint-config

oxlint presets. A package's `.oxlintrc.json` is
`{ "extends": ["./node_modules/@figentra/oxlint-config/<preset>.json"] }` — oxlint resolves `extends` as a
file path, not a package export, so every preset stays a plain JSON file at this package's root.

| Preset            | Extends | Adds                                                                                                                                                                                                                                |
| ----------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base.json`       | —       | categories: `correctness` error, `suspicious` warn, `style` warn (oxlint ≥ 1.x: categories live under `categories`, not `rules`).                                                                                                   |
| `react.json`      | base    | `react` plugin, `react/jsx-no-target-blank` error.                                                                                                                                                                                  |
| `native.json`     | react   | React Native / Expo: `shared-node-browser` + `jest` envs, `__DEV__`, `global`, `HermesInternal`, `ErrorUtils` globals.                                                                                                              |
| `worker.json`     | base    | Cloudflare Workers (no extra rules yet).                                                                                                                                                                                            |
| `decorators.json` | base    | Framework tier: `typescript/consistent-type-imports` off (its fix turns a class import into `import type` and drops `design:paramtypes` to `Object`); `eslint/new-cap` with `capIsNew: false` (decorator factories are PascalCase). |
