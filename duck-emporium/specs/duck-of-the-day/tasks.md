# Duck of the Day Tasks

## Task 1: Add Availability to Catalog Data

Add `soldOut` to the `Duck` model, validation, tests, and every seeded duck in `src/data/ducks.json`.

Dependencies: existing browse-catalog implementation.

Acceptance check:

- Every catalog duck has `soldOut`.
- Invalid duck records without `soldOut` are rejected.
- Existing catalog loading behavior still works.

## Task 2: Add Duck of the Day Selection Logic

Create `src/duckOfTheDay.ts` with deterministic selection based on the UTC calendar day.

Dependencies: Task 1.

Acceptance check:

- Same date and same catalog return the same featured duck.
- Next UTC day returns a different duck when at least two ducks are available.
- Sold-out ducks are skipped.
- All-sold-out catalogs return an empty result.

## Task 3: Render Duck of the Day on Home Page

Update `renderCatalogPage` to show a featured Duck of the Day section above the catalog.

Dependencies: Tasks 1-2.

Acceptance check:

- Featured section shows name, category, price, and tagline.
- Featured section links to `/ducks/<duck-id>`.
- Empty featured state renders "The pond is empty today, come back tomorrow."
- The normal catalog still renders.

## Task 4: Pass Date Through Server Rendering

Update `renderHomePage` and `createApp` options so tests can pass a fixed date.

Dependencies: Task 3.

Acceptance check:

- Home page rendering accepts `today`.
- Route output includes Duck of the Day content.
- Existing route tests still pass.

## Task 5: Final Duck of the Day Verification

Run the full verification for Chapter 2.

Dependencies: Tasks 1-4.

Acceptance check:

- `npm test` passes.
- `npm run typecheck` passes.
- Duck of the Day acceptance criteria are covered by tests.
- Changes are committed and pushed to GitHub.
