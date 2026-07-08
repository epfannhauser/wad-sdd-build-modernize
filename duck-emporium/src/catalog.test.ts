import { mkdtemp, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { describe, expect, it } from "vitest";

import { loadCatalog } from "./catalog.js";

async function writeTempCatalog(contents: unknown): Promise<string> {
  const directory = await mkdtemp(join(tmpdir(), "duck-catalog-"));
  const filePath = join(directory, "ducks.json");

  await writeFile(filePath, JSON.stringify(contents), "utf8");

  return filePath;
}

describe("loadCatalog", () => {
  it("reads the default seed catalog", async () => {
    const ducks = await loadCatalog();

    expect(ducks.length).toBeGreaterThanOrEqual(10);
  });

  it("loads seed ducks across at least three categories", async () => {
    const ducks = await loadCatalog();
    const categories = new Set(ducks.map((duck) => duck.category));

    expect(categories.size).toBeGreaterThanOrEqual(3);
  });

  it("loads seed ducks with all required fields", async () => {
    const ducks = await loadCatalog();

    ducks.forEach((duck) => {
      expect(duck).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          category: expect.any(String),
          price: expect.any(Number),
          tagline: expect.any(String),
          soldOut: expect.any(Boolean),
        }),
      );
      expect(duck.id).not.toHaveLength(0);
      expect(duck.name).not.toHaveLength(0);
      expect(duck.category).not.toHaveLength(0);
      expect(duck.tagline).not.toHaveLength(0);
      expect(duck.price).toBeGreaterThanOrEqual(0);
    });
  });

  it("reads a custom catalog path", async () => {
    const filePath = await writeTempCatalog([
      {
        id: "test-duck",
        name: "Test Duck",
        category: "Testing",
        price: 1.23,
        tagline: "Quacks under pressure.",
        soldOut: false,
      },
    ]);

    await expect(loadCatalog(filePath)).resolves.toEqual([
      {
        id: "test-duck",
        name: "Test Duck",
        category: "Testing",
        price: 1.23,
        tagline: "Quacks under pressure.",
        soldOut: false,
      },
    ]);
  });

  it("rejects ducks with missing required fields", async () => {
    const filePath = await writeTempCatalog([
      {
        id: "broken-duck",
        name: "Broken Duck",
        category: "Testing",
        price: 1.23,
      },
    ]);

    await expect(loadCatalog(filePath)).rejects.toThrow("not a valid duck");
  });

  it("loads an empty catalog as an empty list", async () => {
    const filePath = await writeTempCatalog([]);

    await expect(loadCatalog(filePath)).resolves.toEqual([]);
  });
});
