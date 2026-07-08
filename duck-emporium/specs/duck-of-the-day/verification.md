# Duck of the Day Verification

## Result

Duck of the Day is implemented and verified.

## Acceptance Criteria Coverage

- A Duck of the Day appears when available ducks exist.
- The same catalog and same UTC date select the same duck.
- The next UTC date selects a different duck when at least two ducks are available.
- Sold-out ducks are skipped.
- When every duck is sold out, the home page shows:
  - "The pond is empty today, come back tomorrow."
- The featured duck links to `/ducks/<duck-id>`.
- The existing catalog still renders below the featured section.

## Verification Commands

```bash
npm test
npm run typecheck
```

## Verification Output

- `npm test`: 19 tests passed.
- `npm run typecheck`: passed.
