# Duck of the Day Plan

## Data Model

Extend the existing `Duck` type with:

```ts
soldOut: boolean;
```

Update `src/data/ducks.json` so every existing duck has `soldOut`. Most seed ducks should be `false`; at least one can be `true` so sold-out behavior is visible in tests.

## Module and File Layout

- `src/catalog.ts`
  - Add `soldOut` to the `Duck` type and validation.
- `src/data/ducks.json`
  - Add `soldOut` to each duck.
- `src/duckOfTheDay.ts`
  - Add deterministic selection logic.
  - Export a function that picks the duck for a UTC calendar date.
- `src/duckOfTheDay.test.ts`
  - Test deterministic same-day behavior.
  - Test next-day behavior.
  - Test sold-out ducks are skipped.
  - Test all-sold-out fallback state.
- `src/renderCatalog.ts`
  - Render a Duck of the Day section above the normal catalog.
  - Render the friendly fallback when no available duck exists.
  - Render a link to `/ducks/<duck-id>`.
- `src/renderCatalog.test.ts`
  - Add tests for Duck of the Day HTML and fallback.
- `src/server.ts`
  - Pass the current date into the home page rendering flow.
- `src/server.test.ts`
  - Add coverage that the home page includes Duck of the Day content.

## Public Interfaces

```ts
export type DuckOfTheDayResult =
  | { kind: "featured"; duck: Duck }
  | { kind: "empty" };

export function selectDuckOfTheDay(ducks: Duck[], date: Date): DuckOfTheDayResult;

export function renderCatalogPage(
  ducks: Duck[],
  options?: { today?: Date },
): string;

export async function renderHomePage(
  options?: { catalogPath?: string; today?: Date },
): Promise<string>;
```

Selection rule:

- Filter out ducks where `soldOut` is `true`.
- If no ducks remain, return `{ kind: "empty" }`.
- Convert the provided date to a UTC day number.
- Use `dayNumber % availableDucks.length` as the selected index.

This keeps the result deterministic, testable, and independent from user timezone.

## External Dependencies

No new dependencies.

Use existing:

- Express
- Vitest
- TypeScript

## Testing Strategy

Automated tests must cover:

1. Same date and same catalog returns the same duck.
2. Next UTC date returns a different duck when there are at least two available ducks.
3. Sold-out ducks are skipped.
4. All-sold-out catalog returns the friendly fallback state.
5. Home page renders a Duck of the Day section with name, category, price, tagline, and link.
6. Home page renders "The pond is empty today, come back tomorrow." when all ducks are sold out.
7. Existing browse-catalog tests still pass.

Run:

```bash
npm test
npm run typecheck
```

## Risks

- The existing catalog tests must be updated because `soldOut` becomes a required field.
- Tests should pass explicit dates instead of relying on the real current date.
- The detail link can point to `/ducks/<duck-id>` even though the detail page is not implemented yet.
- The existing home page should still show the full catalog; Duck of the Day is an addition, not a replacement.
