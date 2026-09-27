# Security Policy

## Reporting a vulnerability

Do not open a public issue. Report vulnerabilities privately through GitHub Security Advisories
("Report a vulnerability" on the Security tab). Include steps to reproduce and the affected versions.

## Secrets

Secrets never enter the repository. Gitleaks runs in pre-commit and CI. Runtime values come from the
process environment, a local ignored `.env.local`, Infisical or Doppler.
