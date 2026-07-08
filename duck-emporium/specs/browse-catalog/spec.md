# Browse Catalog Spec

## Problem

Visitors need a home page that shows the available rubber ducks before they decide to buy anything. The catalog must come from local storage so later stories can build on the same product data.

## Users

- Quincy Quacker, a customer browsing the shop.
- Future stories may reuse the same catalog data for detail pages, cart actions, search, and curator workflows.

## Scope

### In

- Serve a home page or root catalog endpoint that returns a list of ducks.
- Read catalog data from local storage.
- Seed at least 10 ducks across at least 3 categories.
- Show each duck's name, category, price, and one-line tagline.
- Show an explicit empty-state message when the catalog has no ducks.

### Out

- Pagination.
- Images.
- Sorting controls.
- Search and filtering.
- Cart, checkout, admin, and authentication behavior.

## Functional Requirements

1. The application must expose a root catalog experience for visitors.
2. The catalog must be loaded from a local JSON file.
3. The seed catalog must contain at least 10 ducks.
4. The seed catalog must include at least 3 distinct categories.
5. Each duck item must include:
   - `id`
   - `name`
   - `category`
   - `price`
   - `tagline`
6. Each rendered catalog item must display at minimum:
   - name
   - category
   - price
   - tagline
7. If local storage contains an empty catalog, the response must include an explicit empty-state message.
8. The application must not call external services for catalog data.

## Non-Functional Requirements

- Use TypeScript, ES modules, and Node 20+.
- Keep storage local and deterministic for tests.
- Use Express for the initial HTTP app.
- Use Vitest for automated tests.
- Keep payments out of scope and mocked in later stories.

## Acceptance Criteria

1. Given seeded catalog data, when Quincy opens the home page, then at least 10 ducks are listed.
2. Given seeded catalog data, when Quincy views the home page, then each duck shows name, category, price, and tagline.
3. Given seeded catalog data, when the catalog is inspected, then it includes at least 3 categories.
4. Given an empty catalog, when Quincy opens the home page, then an explicit empty-state message appears.
5. Given the application is tested, when `vitest` runs, then the browse catalog acceptance criteria are covered by automated tests.

## Open Questions

- None for this workshop iteration. Assumptions: the first implementation is a server-rendered Express home page backed by a local JSON file.
