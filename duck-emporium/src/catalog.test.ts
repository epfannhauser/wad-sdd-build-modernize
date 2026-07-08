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
    expect(ducks[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        category: expect.any(String),
        price: expect.any(Number),
        tagline: expect.any(String),
      }),
    );
  });

  it("reads a custom catalog path", async () => {
    const filePath = await writeTempCatalog([
      {
        id: "test-duck",
        name: "Test Duck",
        category: "Testing",
        price: 1.23,
        tagline: "Quacks under pressure.",
      },
    ]);

    await expect(loadCatalog(filePath)).resolves.toEqual([
      {
        id: "test-duck",
        name: "Test Duck",
        category: "Testing",
        price: 1.23,
        tagline: "Quacks under pressure.",
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
});
