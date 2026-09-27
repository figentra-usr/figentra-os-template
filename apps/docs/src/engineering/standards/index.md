---
title: Standards
description: The hard rules code in this repository must follow — module boundaries, tenancy isolation, secrets handling, and the rest of the non-negotiables.
---

# Standards

Standards are the non-negotiable rules, as distinct from the general engineering notes in the parent folder. This is where module/service boundaries, tenancy and data-isolation requirements, secrets handling, and any other hard invariant get written down in one place so a reviewer (human or agent) can point at a page instead of re-explaining the rule every time.

A standard is written by whoever owns that concern — the person or team responsible for the boundary, the tenancy model, or the secrets strategy — and it's expected to be current: if the code and the standard disagree, that's a bug in one of them, not a matter of interpretation. Standards here should stay grounded in what the codebase actually enforces (lint rules, CI checks, generated code) rather than aspirational policy.

**Nothing has been written here yet.** As this template's rules solidify — how services are split, how tenant data is isolated, how secrets are declared and set — write each one down here as it's decided, rather than leaving it as an unwritten convention only a few people know.
