# @figentra/typescript-config

tsconfig presets. A package's `tsconfig.json` is `{ "extends": "@figentra/typescript-config/<preset>", "include": [...] }`
and nothing else — every compiler option lives here, with its reason below (JSON cannot carry comments).

| Preset         | Extends   | Use for                                                                        |
| -------------- | --------- | ------------------------------------------------------------------------------ |
| `./base`       | —         | anything TypeScript that is bundled (apps, packages, configs)                  |
| `./library`    | `base`    | a tsdown-built library (`packages/*`) — adds declaration + strictness flags    |
| `./decorators` | `library` | a library that uses legacy decorators and `design:*` metadata (framework tier) |
| `./vite-node`  | `base`    | Node-only tooling built with Vite / vite-node                                  |
| `./worker`     | `base`    | Cloudflare Workers                                                             |

## base

| Option                              | Why                                                                                                              |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `target: ES2022`                    | Node ≥ 24, evergreen browsers and Workers all run it; tsdown/vite pick the real emit target from `engines.node`. |
| `module: ESNext`                    | ESM only, everywhere.                                                                                            |
| `moduleResolution: Bundler`         | Output is always produced by a bundler (rolldown via tsdown/vite); extensionless relative imports stay legal.    |
| `strict`                            | Baseline.                                                                                                        |
| `noUncheckedIndexedAccess`          | `arr[i]` is `T \| undefined` — catches the most common runtime crash class.                                      |
| `exactOptionalPropertyTypes`        | `{ a?: T }` does not accept an explicit `undefined`; keeps API contracts honest.                                 |
| `isolatedModules`                   | Every file must be transpilable alone — required by oxc, which transforms per file.                              |
| `verbatimModuleSyntax`              | Imports are emitted exactly as written; `import type` is the only erased form (see the decorators note below).   |
| `resolveJsonModule`                 | `import data from "./x.json"`.                                                                                   |
| `esModuleInterop`                   | Default-import CJS dependencies safely.                                                                          |
| `forceConsistentCasingInFileNames`  | macOS is case-insensitive, CI is not.                                                                            |
| `skipLibCheck`                      | Do not re-check third-party `.d.ts`; typecheck time.                                                             |
| `baseUrl: .` + `paths: @/* → src/*` | The `@/` alias used by apps and tests (vitest configs mirror it).                                                |

## library (extends base)

| Option                                 | Why                                                                                                                                                                                            |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `declaration`, `declarationMap`        | tsdown's dts step (rolldown-plugin-dts) reads these: `.d.ts` for consumers, `.d.ts.map` for go-to-source.                                                                                      |
| `sourceMap`                            | Matches `sourcemap: true` in the tsdown preset so stack traces point at `src/`.                                                                                                                |
| `noImplicitOverride`                   | `override` is mandatory on overriding members — silent base-class drift is a bug in a library.                                                                                                 |
| `noImplicitReturns`                    | Every code path returns; a library's public functions must not leak `undefined` by accident.                                                                                                   |
| `noFallthroughCasesInSwitch`           | Fallthrough only with an explicit comment.                                                                                                                                                     |
| `noUnusedLocals`, `noUnusedParameters` | Dead code never ships; prefix `_` for intentionally unused parameters.                                                                                                                         |
| `types: ["node", "vitest/globals"]`    | `tsdown.config.ts` runs on Node; the `@figentra/testing` preset enables vitest globals. A library therefore declares `@types/node: catalog:` and `vitest: catalog:quality` as devDependencies. |

`target`, `module` and `moduleResolution` stay as in `base`: the dist is produced by rolldown (bundler
semantics), `isolatedModules` + `verbatimModuleSyntax` already guarantee per-file transpilability, and
`NodeNext` would only add a `.js`-extension requirement that a bundled output never needs. `lib` is left
to the target default on purpose; a preset that needs to remove DOM types does so explicitly (`vite-node`, `worker`).

## decorators (extends library)

| Option                   | Why                                                                                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `experimentalDecorators` | The framework tier uses TypeScript's legacy decorators (Nest-shaped `@Injectable()`, `@Inject(token)` parameter decorators — TC39 decorators have no parameter form). |
| `emitDecoratorMetadata`  | `design:paramtypes` / `design:type` / `design:returntype` via `reflect-metadata`, which the DI container reads.                                                       |

The same two flags must reach the transpilers: `library(entries, { decorators: true })` from
`@figentra/tsdown-config` (build) and `@figentra/testing/preset-decorators` (vitest). Lint with
`@figentra/oxlint-config/decorators`: it turns off `typescript/consistent-type-imports`, whose auto-fix
rewrites `import { Bar }` to `import type { Bar }` and silently degrades the emitted parameter type to `Object`.
