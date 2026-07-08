# Browse Catalog Tasks

## Task 1: Add Seed Catalog Data

Create `src/data/ducks.json` with at least 10 ducks across at least 3 categories.

Dependencies: none.

Acceptance check:

- The JSON file exists.
- It contains at least 10 ducks.
- It contains at least 3 distinct categories.

## Task 2: Add Catalog Loading Module

Create `src/catalog.ts` with the `Duck` type and `loadCatalog(filePath?: string)` function.

Dependencies: Task 1.

Acceptance check:

- `loadCatalog()` reads the default seed catalog.
- `loadCatalog(customPath)` can read a test JSON file.
- Invalid or missing required duck fields are rejected by tests.
- `npm test -- src/catalog.test.ts` passes.

## Task 3: Add Catalog Module Tests

Create `src/catalog.test.ts` covering seed data and empty catalog loading.

Dependencies: Task 2.

Acceptance check:

- Tests prove the seed catalog has at least 10 ducks.
- Tests prove the seed catalog has at least 3 categories.
- Tests prove every duck has `id`, `name`, `category`, `price`, and `tagline`.
- Tests prove an empty JSON catalog can be loaded as an empty list.
- `npm test -- src/catalog.test.ts` passes.

## Task 4: Add Catalog HTML Renderer

Create `src/renderCatalog.ts` with `renderCatalogPage(ducks: Duck[])`.

Dependencies: Tasks 1-3.

Acceptance check:

- Non-empty catalogs render every duck's name, category, price, and tagline.
- Empty catalogs render an explicit empty-state message.
- Renderer output is simple HTML suitable for `GET /`.

## Task 5: Add Renderer Tests

Create `src/renderCatalog.test.ts`.

Dependencies: Task 4.

Acceptance check:

- Tests prove required duck fields appear in the rendered HTML.
- Tests prove the empty-state message appears when no ducks are provided.
- `npm test -- src/renderCatalog.test.ts` passes.

## Task 6: Add Express App

Create `src/server.ts` with `createApp(options?: { catalogPath?: string })`.

Dependencies: Tasks 1-5.

Acceptance check:

- `GET /` returns HTML with seeded duck catalog data.
- `GET /` can be tested with a custom empty catalog path.
- The app does not call external services.

## Task 7: Add HTTP Route Tests

Add tests for the Express app route.

Dependencies: Task 6.

Acceptance check:

- Tests prove `GET /` returns catalog HTML.
- Tests prove `GET /` returns the empty-state message with an empty catalog.
- `npm test` passes.
- `npm run typecheck` passes.

## Task 8: Final Browse Catalog Verification

Run the complete verification for the story.

Dependencies: Tasks 1-7.

Acceptance check:

- `npm test` passes.
- `npm run typecheck` passes.
- Story 1 acceptance criteria are covered by tests.
- No out-of-scope features were added.
