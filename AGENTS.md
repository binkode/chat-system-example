# AGENTS.md

## Purpose
This is a Laravel testing application for the `binkode/laravel-chat-system` package. Use these rules to keep changes focused on exercising the package without turning this app into a production template.

## Project Facts (Source of Truth)
- App type: Laravel application used as a test harness
- Primary dependency under test: `binkode/laravel-chat-system`
- Frontend stack: Inertia + React + Vite
- PHP version target: as defined by the app `composer.json`
- Test framework: PHPUnit (via `composer test` or `php artisan test`)

## Non-Negotiable Rules
- Keep changes minimal and test-focused; do not refactor unrelated app code.
- Do not change package public APIs in `packages/` from this app unless explicitly asked.
- Avoid breaking changes to routes, auth, or Inertia setup used by tests/demos.
- No new dependencies unless required by the task and approved.
- Update docs when app usage or setup changes.

## Safe Change Boundaries
- Prefer changes in:
  - `resources/` (views, JS, CSS)
  - `routes/` (web and API routes)
  - `tests/`
  - `config/` (only when required to exercise package features)
- Avoid touching `vendor/` and lockfiles unless explicitly requested.

## Testing Rules
- Favor Laravel HTTP fakes for external calls.
- Add or update tests when behavior changes.
- Preferred test command: `php artisan test`.
- If tests cannot run, report why and what would be needed.

## Coding Conventions
- Match existing Laravel and project style (PSR-12 for PHP, standard React/Vite conventions).
- Keep controllers thin; push logic into app services only when necessary for test clarity.
- For frontend, keep components small and focused on demoing package features.

## Definition of Done
- App still boots and renders the chat system UI.
- Tests pass or a clear blocker is documented.
- Docs updated if setup or usage changed.

## High-Signal Prompt Template
```md
Task: <one clear outcome>
Context: <feature/bug + why it matters>
Scope: <files allowed to change>
Constraints: <no new deps, keep app as test harness, etc.>
Acceptance Criteria:
- <observable behavior 1>
- <observable behavior 2>
Tests:
- <exact command, usually `php artisan test`>
Deliverable:
- <changed files + rationale + any risks>
```
