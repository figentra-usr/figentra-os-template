# flutter_template

> Scaffolded via `flutter create` (Flutter 3.41.8, Dart 3.11.5). This is a template
> starting point only — no business logic belongs here; it's a bootstrap shell.

**Platforms: Android and iOS only.** The `web/`, `windows/`, `macos/`, and `linux/`
platform folders that `flutter create` scaffolds by default have been removed —
this template targets mobile only.

## Source layout

Source lives under `lib/` (the standard Flutter/Dart convention — package imports,
`flutter analyze`, and tooling all assume `lib/`). There is no `src/` directory.
Currently just `lib/main.dart`; if this grows into a non-trivial app, prefer
`lib/src/**` for implementation plus a barrel export, or a couple of
obviously-named subfolders (e.g. `lib/app/`) — don't invent structure ahead of need.

## Linting and formatting

Dart/Flutter code is **not** linted or formatted by this repo's root oxlint/oxfmt
(those cover TypeScript/JS only). Instead:

- **Lint:** `flutter analyze`, configured by `analysis_options.yaml`
  (`package:flutter_lints`).
- **Format:** `dart format .` (Dart's built-in formatter).

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Learn Flutter](https://docs.flutter.dev/get-started/learn-flutter)
- [Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Flutter learning resources](https://docs.flutter.dev/reference/learning-resources)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.
