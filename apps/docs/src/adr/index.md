---
title: ADRs
description: Architecture Decision Records — one file per decision, numbered continuously, never deleted.
---

# Architecture Decision Records

An ADR records a single architectural or process decision: the context that forced it, the options considered, and what was chosen and why. Numbering is continuous and an ADR is never deleted — only superseded, with the new record's header pointing back at the one it replaces (`**Superseded by:**`) so the history of *why* stays intact even after the decision changes.

Anyone making a decision worth defending later — a service boundary, a technology choice, a reversal of an earlier call — writes the ADR at the time the decision is made, not retroactively. Adding a page here doesn't require running `pnpm nav` by hand for anything beyond the file itself; the navigation picks it up automatically the next time `pnpm nav` runs.

**No ADRs have been recorded yet — the first one starts at 0001.**
