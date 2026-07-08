import { describe, expect, it } from "vitest";

import type { Duck } from "./catalog.js";
import { renderCatalogPage } from "./renderCatalog.js";

const sampleDucks: Duck[] = [
  {
    id: "classic-debugging-duck",
    name: "Classic Debugging Duck",
    category: "Debugging",
    price: 9.99,
    tagline: "Listens patiently while your bug explains itself.",
  },
  {
    id: "socrates-duck",
    name: "Socrates Duck",
    category: "Philosopher",
    price: 14.95,
    tagline: "Answers every question with a smaller, stranger question.",
  },
];

describe("renderCatalogPage", () => {
  it("renders required fields for every duck", () => {
    const html = renderCatalogPage(sampleDucks);

    expect(html).toContain("Classic Debugging Duck");
    expect(html).toContain("Debugging");
    expect(html).toContain("€9.99");
    expect(html).toContain("Listens patiently while your bug explains itself.");
    expect(html).toContain("Socrates Duck");
    expect(html).toContain("Philosopher");
    expect(html).toContain("€14.95");
    expect(html).toContain("Answers every question with a smaller, stranger question.");
  });

  it("renders an explicit empty-state message", () => {
    const html = renderCatalogPage([]);

    expect(html).toContain("No ducks are currently available. Please check back soon.");
  });

  it("escapes duck text before rendering HTML", () => {
    const html = renderCatalogPage([
      {
        id: "spicy-duck",
        name: "<Spicy Duck>",
        category: "Debugging & Testing",
        price: 1,
        tagline: "\"Quack\" <script>alert('oops')</script>",
      },
    ]);

    expect(html).toContain("&lt;Spicy Duck&gt;");
    expect(html).toContain("Debugging &amp; Testing");
    expect(html).toContain("&quot;Quack&quot; &lt;script&gt;alert(&#39;oops&#39;)&lt;/script&gt;");
    expect(html).not.toContain("<script>");
  });
});
