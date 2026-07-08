import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { createApp, renderHomePage } from "./server.js";

async function writeTempCatalog(contents: unknown): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), "duck-server-catalog-"));
  const filePath = join(directory, "ducks.json");

  await writeFile(filePath, JSON.stringify(contents), "utf8");

  return filePath;
}

describe("GET /", () => {
  it("is registered on the Express app", () => {
    const app = createApp();
    const routeStack = app._router.stack as Array<{ route?: { path: string; methods: Record<string, boolean> } }>;
    const homeRoute = routeStack.find((layer) => layer.route?.path === "/");

    expect(homeRoute?.route?.methods.get).toBe(true);
  });

  it("returns catalog HTML with seeded duck data", async () => {
    const html = await renderHomePage({ today: new Date("2026-07-08T00:00:00.000Z") });

    expect(html).toContain("The Rubber Duck Emporium");
    expect(html).toContain("Duck of the Day");
    expect(html).toContain("Classic Debugging Duck");
    expect(html).toContain("Debugging");
    expect(html).toContain("€9.99");
    expect(html).toContain("Listens patiently while your bug explains itself.");
  });

  it("accepts a fixed date for deterministic Duck of the Day rendering", async () => {
    const catalogPath = await writeTempCatalog([
      {
        id: "alpha-duck",
        name: "Alpha Duck",
        category: "Testing",
        price: 1,
        tagline: "First in line.",
        soldOut: false,
      },
      {
        id: "beta-duck",
        name: "Beta Duck",
        category: "Testing",
        price: 2,
        tagline: "Second but steady.",
        soldOut: false,
      },
    ]);
    const html = await renderHomePage({ catalogPath, today: new Date("2026-07-08T00:00:00.000Z") });

    expect(html).toContain("Duck of the Day");
    expect(html).toContain('href="/ducks/alpha-duck"');
  });

  it("returns the empty-state message with an empty catalog", async () => {
    const catalogPath = await writeTempCatalog([]);
    const html = await renderHomePage({ catalogPath });

    expect(html).toContain("No ducks are currently available. Please check back soon.");
  });
});
