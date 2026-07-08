---
name: run-tests
description: Run and fix the repository's Node.js tests. Use when asked to execute tests, diagnose test failures, or iterate until the TypeScript workshop examples pass.
---

# Run Tests

Use this workflow for dependency-free TypeScript workshop examples.

1. Inspect the relevant source and matching `*.test.ts` files.
2. Run the narrowest relevant test command first, for example:

   ```bash
   node --test hello.test.ts
   ```

3. If the user asks for a full test pass, run all local Node test files with:

   ```bash
   node --test
   ```

4. When tests fail, read the failing assertion and stack trace before editing.
5. Fix production code when the test describes intended behavior. Fix the test only when it is clearly wrong or out of date.
6. Re-run the same test command until it passes.
7. Report the command and final pass/fail result.
