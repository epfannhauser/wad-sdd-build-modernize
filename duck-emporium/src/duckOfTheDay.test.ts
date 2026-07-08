import { describe, expect, it } from "vitest";

import type { Duck } from "./catalog.js";
import { selectDuckOfTheDay } from "./duckOfTheDay.js";

const ducks: Duck[] = [
  {
    id: "classic",
    name: "Classic Duck",
    category: "Debugging",
    price: 9.99,
    tagline: "Listens patiently.",
    soldOut: false,
  },
  {
    id: "captain",
    name: "Captain Duck",
    category: "Maritime",
    price: 15,
    tagline: "Keeps the fleet steady.",
    soldOut: false,
  },
  {
    id: "sleepy",
    name: "Sleepy Duck",
    category: "Wellness",
    price: 11,
    tagline: "Takes calm very seriously.",
    soldOut: true,
  },
];

describe("selectDuckOfTheDay", () => {
  it("selects the same duck for the same UTC day and catalog", () => {
    const date = new Date("2026-07-08T12:30:00.000Z");

    expect(selectDuckOfTheDay(ducks, date)).toEqual(selectDuckOfTheDay(ducks, date));
  });

  it("selects a different duck on the next UTC day when at least two ducks are available", () => {
    const today = selectDuckOfTheDay(ducks, new Date("2026-07-08T00:00:00.000Z"));
    const tomorrow = selectDuckOfTheDay(ducks, new Date("2026-07-09T00:00:00.000Z"));

    expect(today.kind).toBe("featured");
    expect(tomorrow.kind).toBe("featured");
    if (today.kind === "featured" && tomorrow.kind === "featured") {
      expect(tomorrow.duck.id).not.toBe(today.duck.id);
    }
  });

  it("skips sold-out ducks", () => {
    const result = selectDuckOfTheDay(
      [
        { ...ducks[0], soldOut: true },
        { ...ducks[1], soldOut: false },
        { ...ducks[2], soldOut: true },
      ],
      new Date("2026-07-08T00:00:00.000Z"),
    );

    expect(result).toEqual({
      kind: "featured",
      duck: { ...ducks[1], soldOut: false },
    });
  });

  it("returns an empty result when every duck is sold out", () => {
    const result = selectDuckOfTheDay(
      ducks.map((duck) => ({ ...duck, soldOut: true })),
      new Date("2026-07-08T00:00:00.000Z"),
    );

    expect(result).toEqual({ kind: "empty" });
  });
});
