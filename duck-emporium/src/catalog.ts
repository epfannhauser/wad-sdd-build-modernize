import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export type Duck = {
  id: string;
  name: string;
  category: string;
  price: number;
  tagline: string;
  soldOut: boolean;
};

const currentDir = dirname(fileURLToPath(import.meta.url));
const defaultCatalogPath = join(currentDir, "data", "ducks.json");

function isDuck(value: unknown): value is Duck {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.id === "string" &&
    candidate.id.length > 0 &&
    typeof candidate.name === "string" &&
    candidate.name.length > 0 &&
    typeof candidate.category === "string" &&
    candidate.category.length > 0 &&
    typeof candidate.price === "number" &&
    Number.isFinite(candidate.price) &&
    candidate.price >= 0 &&
    typeof candidate.tagline === "string" &&
    candidate.tagline.length > 0 &&
    typeof candidate.soldOut === "boolean"
  );
}

function parseCatalog(contents: string, source: string): Duck[] {
  const parsed: unknown = JSON.parse(contents);

  if (!Array.isArray(parsed)) {
    throw new Error(`Catalog at ${source} must be a JSON array`);
  }

  parsed.forEach((duck, index) => {
    if (!isDuck(duck)) {
      throw new Error(`Catalog item ${index} in ${source} is not a valid duck`);
    }
  });

  return parsed;
}

export async function loadCatalog(filePath = defaultCatalogPath): Promise<Duck[]> {
  const contents = await readFile(filePath, "utf8");

  return parseCatalog(contents, filePath);
}
