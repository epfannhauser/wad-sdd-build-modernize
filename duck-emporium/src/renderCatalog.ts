import type { Duck } from "./catalog.js";

const emptyCatalogMessage = "No ducks are currently available. Please check back soon.";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function renderDuck(duck: Duck): string {
  return [
    '<article class="duck-card">',
    `  <h2>${escapeHtml(duck.name)}</h2>`,
    `  <p class="duck-category">${escapeHtml(duck.category)}</p>`,
    `  <p class="duck-price">${formatPrice(duck.price)}</p>`,
    `  <p class="duck-tagline">${escapeHtml(duck.tagline)}</p>`,
    "</article>",
  ].join("\n");
}

export function renderCatalogPage(ducks: Duck[]): string {
  const catalogContent =
    ducks.length === 0
      ? `<p class="empty-state">${emptyCatalogMessage}</p>`
      : `<section class="catalog-grid">\n${ducks.map(renderDuck).join("\n")}\n</section>`;

  return [
    "<!doctype html>",
    '<html lang="en">',
    "<head>",
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1">',
    "  <title>The Rubber Duck Emporium</title>",
    "</head>",
    "<body>",
    "  <main>",
    "    <h1>The Rubber Duck Emporium</h1>",
    `    ${catalogContent}`,
    "  </main>",
    "</body>",
    "</html>",
  ].join("\n");
}
