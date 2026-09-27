/**
 * Figentra file contract:
 * Purpose: license-compliance gate for CI. Runs `pnpm licenses list --prod --json` (production
 *          dependencies of every workspace, so devDependency-only tooling like the docs toolchain or
 *          native build helpers never trips this) and fails when any resolved license is not on the
 *          allow-list below. An "OR" SPDX expression (e.g. "(MIT OR Apache-2.0)") passes if at least one
 *          branch is allowed; "Unknown"/unparseable licenses always fail and need a manual allowlist
 *          entry with a comment explaining why.
 * Scope: whole workspace (all `apps/*`, `services/*`, `packages/*` production dependency graphs).
 * Owner: dependency-steward · Secrets: forbidden
 */
import { execFileSync } from 'node:child_process';

// Default allow-list: OSI-approved permissive licenses plus two narrow, documented additions.
// Add to this list deliberately — each addition should be reviewed by dependency-steward.
const ALLOWED_LICENSES = new Set([
  'MIT',
  'Apache-2.0',
  'Apache 2.0',
  'BSD-2-Clause',
  'BSD-3-Clause',
  'ISC',
  '0BSD',
  'CC0-1.0',
  'Unlicense',
  // Blue Oak Council's permissive license — used by some modern JS tooling (e.g. tinylibs).
  'BlueOak-1.0.0',
  // Python Software Foundation license — permissive, appears in some cross-published tooling.
  'Python-2.0',
  // MPL-2.0 is *file-level* (weak) copyleft: modifications to MPL-licensed files must stay open, but
  // linking/bundling it into a larger MIT-licensed work is not restricted. Distinct from the
  // GPL/AGPL/LGPL family this check exists to catch. Currently pulled in by `lightningcss`
  // (transitive to the format/lint toolchain).
  'MPL-2.0',
]);

// Per-package exceptions: `"name@version": "reason"`. Use sparingly — prefer fixing the dependency.
const PACKAGE_EXCEPTIONS = {};

function parseLicenseExpression(license) {
  // pnpm reports either a bare SPDX id ("MIT") or a parenthesized "OR" expression
  // ("(MIT OR CC0-1.0)"). Split the latter into its candidate ids.
  const trimmed = license.trim().replace(/^\((.*)\)$/, '$1');
  return trimmed.split(/\s+OR\s+/i).map((s) => s.trim());
}

function isAllowed(license) {
  return parseLicenseExpression(license).some((candidate) => ALLOWED_LICENSES.has(candidate));
}

function main() {
  const raw = execFileSync('pnpm', ['licenses', 'list', '--prod', '--json'], {
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  const data = JSON.parse(raw);

  const violations = [];
  for (const [license, packages] of Object.entries(data)) {
    if (isAllowed(license)) continue;
    for (const pkg of packages) {
      for (const version of pkg.versions ?? [pkg.version]) {
        const key = `${pkg.name}@${version}`;
        if (PACKAGE_EXCEPTIONS[key]) continue;
        violations.push({ name: pkg.name, version, license });
      }
    }
  }

  if (violations.length > 0) {
    console.error(
      `License check failed: ${violations.length} production dependencies with a disallowed license.\n`,
    );
    for (const v of violations) {
      console.error(`  ${v.name}@${v.version}: ${v.license}`);
    }
    console.error(
      '\nAllowed licenses: ' +
        [...ALLOWED_LICENSES].sort().join(', ') +
        '\nIf this license is genuinely fine, add a documented entry to ALLOWED_LICENSES or ' +
        'PACKAGE_EXCEPTIONS in scripts/license-check.mjs — never widen it silently.',
    );
    process.exit(1);
  }

  console.log('License check passed: all production dependency licenses are on the allow-list.');
}

main();
