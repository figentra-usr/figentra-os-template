---
title: Runbooks
description: Step-by-step operational procedures for things that go wrong or need doing in production.
---

# Runbooks

A runbook is a procedure, not a reference: "the database migration is stuck, do these steps in order" rather than "here's how migrations work." Runbooks live here so that during an incident, or during a routine but risky operation (a rollback, a manual data fix, a key rotation), whoever's on call can follow numbered steps instead of reconstructing the process from memory or from source code.

Each runbook is written by whoever ran the procedure first, or by whoever owns the system it operates on, and it should be kept honest — if a step is out of date after an infrastructure change, the runbook is wrong until it's fixed, the same day the change ships if possible.

**Nothing has been written here yet.** The first runbook usually gets written right after the first incident or the first manual production fix — write it down then, while the steps are fresh.
