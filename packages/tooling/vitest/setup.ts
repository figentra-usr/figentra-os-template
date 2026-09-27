/**
 * Vitest setup for packages that rely on decorator metadata (`design:paramtypes`, `design:type`).
 *
 * `reflect-metadata` must be loaded before the first decorated class is evaluated; a package's
 * `test/setup.ts` imports this module (or `@figentra/vitest-config/preset-decorators` registers it).
 */
import 'reflect-metadata';
