# Browse Catalog Plan

## Data Model

Create a `Duck` type with these fields:

- `id`: stable string identifier used by later stories.
- `name`: display name.
- `category`: display category, for example `Debugging`, `Philosopher`, or `Wellness`.
- `price`: price in euros as a number.
- `tagline`: one-line catalog teaser.

Store seed data in `src/data/ducks.json`.

The seed file must contain at least 10 ducks across at least 3 categories.

## Module and File Layout

- `src/data/ducks.json`
  - Local catalog storage with seeded duck data.
- `src/catalog.ts`
  - Defines the `Duck` type.
  - Loads and validates catalog data from a JSON file.
  - Exposes helpers for retrieving all ducks and detecting an empty catalog.
- `src/catalog.test.ts`
  - Tests catalog loading, required fields, category count, and empty catalog handling.
- `src/renderCatalog.ts`
  - Converts catalog data into a simple HTML page.
  - Renders the explicit empty-state message.
- `src/renderCatalog.test.ts`
  - Tests the generated HTML for duck fields and empty-state copy.
- `src/server.ts`
  - Creates the Express app.
  - Serves the catalog at `GET /`.

## Public Interfaces

```ts
export type Duck = {
  id: string;
  name: string;
  category: string;
  price: number;
  tagline: string;
};

export async function loadCatalog(filePath?: string): Promise<Duck[]>;

export function renderCatalogPage(ducks: Duck[]): string;

export function createApp(options?: { catalogPath?: string }): Express;
```

HTTP interface:

- `GET /`
  - Returns HTML.
  - With ducks: lists every duck with name, category, price, and tagline.
  - With no ducks: returns an explicit empty-state message.

## External Dependencies

- `express` for the HTTP server.
- `vitest` for tests.
- Node built-ins:
  - `node:fs/promises` for reading local JSON.
  - `node:path` and `node:url` for resolving file paths.

No database, cloud service, payment provider, or external catalog API is used.

## Testing Strategy

Automated tests must cover:

1. Seed catalog has at least 10 ducks.
2. Seed catalog has at least 3 categories.
3. Every duck has `id`, `name`, `category`, `price`, and `tagline`.
4. Rendered catalog page includes the required visible fields.
5. Empty catalog renders a clear empty-state message.
6. `GET /` returns catalog HTML.

Run:

```bash
npm test
npm run typecheck
```

## Risks

- Later stories need stable duck IDs, so seed IDs should be readable and not auto-generated.
- Prices should stay numeric in storage and only be formatted for display.
- The server-rendered HTML should stay simple because story 9 adds the real frontend later.
- Empty catalog behavior must be testable without editing the seed file; tests should use a temporary JSON file or direct renderer input.
