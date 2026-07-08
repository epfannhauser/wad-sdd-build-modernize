# Duck of the Day Spec

## Problem

Quincy should have a fresh reason to return to The Rubber Duck Emporium each day. The home page should feature one deterministic "Duck of the Day" selected from available catalog ducks.

## Users

- Quincy Quacker, a customer browsing the shop.
- Future detail-page visitors who click from the featured duck to a duck detail page.

## Scope

### In

- Select one Duck of the Day per calendar day.
- Show the same duck for every request on the same day.
- Show a different duck on the next day when the catalog has more than one available duck.
- Skip sold-out ducks.
- Show the friendly fallback text when all ducks are sold out:
  - "The pond is empty today, come back tomorrow."
- Render the Duck of the Day on the home page.
- Render a link from the Duck of the Day to `/ducks/<duck-id>`.

### Out

- Per-user personalization.
- Push notifications.
- Email messages.
- Manual curator override.
- Building the duck detail page itself.

## Functional Requirements

1. The application must define a deterministic Duck of the Day selection function.
2. The selection function must accept:
   - a catalog of ducks
   - a date
3. The same date and same catalog must always return the same duck.
4. The next calendar day should select a different duck when at least two ducks are available.
5. Sold-out ducks must not be selected.
6. If all ducks are sold out, the home page must show:
   - "The pond is empty today, come back tomorrow."
7. The home page must show a Duck of the Day section when a duck is available.
8. The Duck of the Day section must show at minimum:
   - name
   - category
   - price
   - tagline
9. The Duck of the Day section must include a link to `/ducks/<duck-id>`.

## Data Requirements

The existing `Duck` model must gain an availability field:

```ts
soldOut: boolean;
```

Existing seed ducks should default to available unless explicitly marked sold out.

## Non-Functional Requirements

- Use TypeScript, ES modules, and Node 20+.
- Keep the selection deterministic and easy to test.
- Do not use external services.
- Use Vitest for automated tests.
- Keep behavior compatible with the existing browse-catalog story.

## Acceptance Criteria

1. Given a catalog with available ducks, when the home page is rendered for a date, then one Duck of the Day appears.
2. Given the same catalog and same date, when multiple requests are made, then the same duck is selected.
3. Given the next calendar day and at least two available ducks, when the home page is rendered, then a different duck is selected.
4. Given sold-out ducks in the catalog, when Duck of the Day is selected, then sold-out ducks are skipped.
5. Given all ducks are sold out, when the home page is rendered, then the friendly fallback text appears and no error occurs.
6. Given a Duck of the Day is shown, when Quincy clicks its link, then the URL points to `/ducks/<duck-id>`.

## Open Questions

- None for this workshop iteration. Assumptions:
  - Duck of the Day appears on the existing home page.
  - The detail link may point to `/ducks/<duck-id>` before the detail page story is implemented.
  - Dates are interpreted using UTC calendar days for deterministic tests.
