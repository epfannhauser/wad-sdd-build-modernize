# Project Instructions

This repository is used for the WeAreDevelopers Spec-Driven Development workshop.

## Workflow

- Keep workshop exercises small and commit one exercise at a time.
- Prefer TypeScript examples that run with Node.js 20 or newer.
- When adding executable TypeScript examples, include a matching `node --test` test file when practical.
- Run the relevant command before committing, for example `node hello.ts` or `node --test hello.test.ts`.

## Code Style

- Use named exports for functions that are tested from another file.
- Throw `RangeError` for numeric input values that are outside the supported range.
- Keep examples dependency-free unless the workshop step explicitly introduces a dependency.

## Repository Boundaries

- Do not edit files in `docs/` unless the task is to update workshop documentation.
- Use `user-stories/` as requirements input for later SDD exercises, not as generated source code.
