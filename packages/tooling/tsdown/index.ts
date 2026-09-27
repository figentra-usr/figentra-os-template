import { defineConfig, type Options } from "tsdown";

export interface LibraryOptions {
  /**
   * Transpile TypeScript experimental (legacy) decorators and emit `design:paramtypes` /
   * `design:type` / `design:returntype` metadata (`reflect-metadata` semantics) in the built output.
   *
   * Mechanism (tsdown 0.15 / rolldown 1.0.0-beta.45): oxc does this natively through rolldown's
   * `transform.decorator` — `legacy` is `experimentalDecorators`, `emitDecoratorMetadata` is the tsc
   * flag of the same name. No swc/babel plugin is involved; rolldown inlines the `__decorate*`
   * helpers, so the built package needs no extra runtime dependency beyond `reflect-metadata`.
   *
   * The flags are set explicitly rather than left to rolldown's tsconfig discovery so a package that
   * passes `tsconfig: false` (or a custom path) still builds correctly. Pair with
   * `@figentra/typescript-config/decorators` so `tsc --noEmit` accepts the syntax; rolldown then sees
   * the same flags twice and reports an equal-value CONFIGURATION_FIELD_CONFLICT, which is filtered.
   * @default false
   */
  decorators?: boolean;
}

const DECORATOR_CONFLICT = /`transform\.decorator`/;

/**
 * tsdown shallow-merges `inputOptions`, so the function form is required to add `transform.decorator`
 * without dropping the `target` / `define` / `inject` tsdown already derived.
 */
const withDecorators: NonNullable<Options["inputOptions"]> = (input) => ({
  ...input,
  transform: {
    ...input.transform,
    decorator: { legacy: true, emitDecoratorMetadata: true },
  },
  onLog: (level, log, defaultHandler) => {
    if (log.code === "CONFIGURATION_FIELD_CONFLICT" && DECORATOR_CONFLICT.test(log.message)) return;
    if (input.onLog) input.onLog(level, log, defaultHandler);
    else defaultHandler(level, log);
  },
});

export function library(
  entries: Record<string, string> = { index: "src/index.ts" },
  options: LibraryOptions = {},
) {
  return defineConfig({
    entry: entries,
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    ...(options.decorators ? { inputOptions: withDecorators } : {}),
  });
}
