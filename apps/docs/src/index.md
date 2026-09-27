---
title: Figentra documentation
description: Platform architecture, product blueprints, engineering standards, runbooks and every decision record — written for humans and agents alike.
---

# Figentra documentation

This is a blank template repository — most sections below are intentionally empty right now. Each folder's index page says plainly what's missing and who should fill it in as the project grows.

| Tab           | What lives there                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Platform**  | The architecture plan, engineering standards, the engineering system (roster, gates, SDLC), runbooks                      |
| **Products**  | Product blueprints and plans                                                                                              |
| **Company**   | Company information, compliance and legal                                                                                 |
| **Decisions** | Every ADR. Numbering is continuous; nothing is deleted, only superseded                                                   |
| **Legacy**    | Superseded documents kept for context, once this project has any. Where they conflict with current docs, current docs win |

## For agents

- This site is served with `llms.txt` and an MCP endpoint at `/mcp` once hosted; locally, read the Markdown directly.
- The repo's root `AGENTS.md` is the entry point for AI coding agents working in this codebase; `apps/docs/src/adr/` is where decisions are recorded.
