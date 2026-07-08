import type { Duck } from "./catalog.js";

export type DuckOfTheDayResult = { kind: "featured"; duck: Duck } | { kind: "empty" };

function getUtcDayNumber(date: Date): number {
  const startOfUtcDay = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

  return Math.floor(startOfUtcDay / 86_400_000);
}

export function selectDuckOfTheDay(ducks: Duck[], date: Date): DuckOfTheDayResult {
  const availableDucks = ducks.filter((duck) => !duck.soldOut);

  if (availableDucks.length === 0) {
    return { kind: "empty" };
  }

  const selectedIndex = getUtcDayNumber(date) % availableDucks.length;

  return {
    kind: "featured",
    duck: availableDucks[selectedIndex],
  };
}
