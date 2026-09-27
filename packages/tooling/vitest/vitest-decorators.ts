/**
 * Vitest preset for the framework tier (`packages/infrastructure/*`): the base preset plus
 * TypeScript experimental (legacy) decorators with `design:*` metadata emission.
 *
 * Mechanism (vitest 5 / vite 8): vite transforms TypeScript with oxc through rolldown's
 * `transformSync`; `oxc.decorator.legacy` is `experimentalDecorators`, `oxc.decorator.emitDecoratorMetadata`
 * is `emitDecoratorMetadata`. `@figentra/typescript-config/decorators` sets the matching tsc flags so
 * `tsc --noEmit` and the test transform agree. This file is the only place the option names live.
 */
import { fileURLToPath } from 'node:url';
import { defineConfig, mergeConfig } from 'vitest/config';
// Self-reference through the exports map: Node (type-stripping the config graph) needs an exact
// specifier, and tsc (which sees this file from every consumer) forbids a literal `./vitest.ts`.
import { figentraVitest } from './vitest.ts';

export const figentraVitestDecorators = mergeConfig(
  figentraVitest,
  defineConfig({
    oxc: {
      decorator: { legacy: true, emitDecoratorMetadata: true },
    },
    test: {
      // `reflect-metadata` before the first decorated class; a package's own setupFiles are appended.
      setupFiles: [fileURLToPath(new URL('./setup.ts', import.meta.url))],
    },
  }),
);

export default figentraVitestDecorators;
