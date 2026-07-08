import type { Duck } from "./catalog.js";
import { selectDuckOfTheDay } from "./duckOfTheDay.js";

const emptyCatalogMessage = "No ducks are currently available. Please check back soon.";
const emptyDuckOfTheDayMessage = "The pond is empty today, come back tomorrow.";

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

const categoryThemes: Record<string, { accent: string; surface: string; detail: string }> = {
  Debugging: {
    accent: "#2563eb",
    surface: "#dbeafe",
    detail: "#1e3a8a",
  },
  Philosopher: {
    accent: "#7c3aed",
    surface: "#ede9fe",
    detail: "#4c1d95",
  },
  Maritime: {
    accent: "#0891b2",
    surface: "#cffafe",
    detail: "#164e63",
  },
  Wellness: {
    accent: "#16a34a",
    surface: "#dcfce7",
    detail: "#14532d",
  },
  "Limited Edition": {
    accent: "#dc2626",
    surface: "#fee2e2",
    detail: "#7f1d1d",
  },
};

function getTheme(category: string): { accent: string; surface: string; detail: string } {
  return categoryThemes[category] ?? {
    accent: "#ca8a04",
    surface: "#fef3c7",
    detail: "#713f12",
  };
}

function renderDuckIllustration(duck: Duck): string {
  const theme = getTheme(duck.category);

  return [
    `<figure class="duck-portrait" style="--duck-accent: ${theme.accent}; --duck-surface: ${theme.surface}; --duck-detail: ${theme.detail};">`,
    '  <svg viewBox="0 0 220 180" role="img" aria-label="Rubber duck illustration">',
    '    <path class="water water-back" d="M31 139c22-12 38 12 60 0s38-12 59 0 36 12 49 0v26H31z" />',
    '    <path class="duck-shadow" d="M58 150c20 18 95 20 123 2 8-5 6-13-4-15-31-7-95-8-123 0-10 3-10 8 4 13z" />',
    '    <path class="duck-body" d="M68 109c15-28 45-43 78-32 26 9 44 33 46 58 2 23-19 37-55 37H82c-24 0-38-11-36-29 2-14 9-25 22-34z" />',
    '    <circle class="duck-head" cx="80" cy="76" r="39" />',
    '    <path class="duck-wing" d="M94 121c15 4 34 4 51-5-5 20-19 31-40 32-14 1-25-5-32-16 5-8 12-12 21-11z" />',
    '    <path class="duck-beak" d="M42 80c-20 1-34 9-38 20 5 11 22 17 44 15 18-2 35-10 46-23-12-9-29-13-52-12z" />',
    '    <path class="duck-beak-top" d="M9 99c12-9 39-12 79-6-10-8-28-13-48-12-18 1-29 7-31 18z" />',
    '    <path class="duck-beak-smile" d="M20 107c18 6 43 3 63-7" />',
    '    <circle class="duck-eye" cx="89" cy="66" r="6" />',
    '    <circle class="duck-eye-shine" cx="91" cy="64" r="2" />',
    '    <path class="duck-cheek" d="M62 83c9 5 22 5 33-1" />',
    '  </svg>',
    "</figure>",
  ].join("\n");
}

const pageStyles = `
    :root {
      color-scheme: light;
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #f8fafc;
      color: #172033;
    }

    * {
      box-sizing: border-box;
    }

    body {
      min-height: 100vh;
      margin: 0;
      background:
        radial-gradient(circle at 12% 14%, rgba(251, 191, 36, 0.22), transparent 28%),
        linear-gradient(180deg, #e0f2fe 0%, #f8fafc 42%, #fff7ed 100%);
    }

    main {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
      padding: 36px 0 56px;
    }

    .hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: 28px;
      align-items: center;
      min-height: 310px;
      padding: 34px 0 28px;
    }

    .hero-copy {
      max-width: 680px;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 14px;
      color: #92400e;
      font-size: 0.86rem;
      font-weight: 800;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    h1 {
      margin: 0;
      color: #0f172a;
      font-size: clamp(2.4rem, 8vw, 5.25rem);
      line-height: 0.98;
      letter-spacing: 0;
    }

    .hero-text {
      max-width: 58ch;
      margin: 20px 0 0;
      color: #475569;
      font-size: 1.08rem;
      line-height: 1.7;
    }

    .hero-badge {
      display: grid;
      place-items: center;
      width: min(32vw, 270px);
      min-width: 190px;
      aspect-ratio: 1;
    }

    .hero-badge svg {
      width: 100%;
      height: auto;
      filter: drop-shadow(0 24px 28px rgba(15, 23, 42, 0.18));
    }

    .shop-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 24px;
    }

    .pill {
      border: 1px solid rgba(15, 23, 42, 0.12);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.74);
      padding: 9px 13px;
      color: #334155;
      font-size: 0.9rem;
      font-weight: 700;
      box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06);
    }

    .catalog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
      gap: 18px;
      align-items: stretch;
    }

    .feature-section {
      display: grid;
      grid-template-columns: minmax(0, 0.95fr) minmax(280px, 1.05fr);
      gap: 0;
      overflow: hidden;
      margin: 0 0 28px;
      border: 1px solid rgba(15, 23, 42, 0.12);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.88);
      box-shadow: 0 22px 42px rgba(15, 23, 42, 0.12);
    }

    .feature-art {
      display: grid;
      place-items: center;
      min-height: 310px;
      background:
        linear-gradient(135deg, var(--duck-surface), rgba(255, 255, 255, 0.62)),
        radial-gradient(circle at 52% 20%, rgba(255, 255, 255, 0.72), transparent 34%);
    }

    .feature-art .duck-portrait {
      width: min(78%, 320px);
      padding: 0;
      background: transparent;
    }

    .feature-art .duck-portrait svg {
      width: 100%;
      max-width: 320px;
    }

    .feature-copy {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 30px;
    }

    .feature-label {
      margin: 0 0 12px;
      color: var(--duck-detail);
      font-size: 0.82rem;
      font-weight: 900;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    .feature-copy h2 {
      margin: 0;
      color: #111827;
      font-size: clamp(1.9rem, 4vw, 3.25rem);
      line-height: 1;
      letter-spacing: 0;
    }

    .feature-copy .duck-category {
      margin-top: 18px;
    }

    .feature-copy .duck-tagline {
      max-width: 48ch;
      margin-bottom: 22px;
      font-size: 1.02rem;
    }

    .feature-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: center;
      margin-top: 4px;
    }

    .feature-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 44px;
      border-radius: 999px;
      background: var(--duck-accent);
      padding: 11px 16px;
      color: #ffffff;
      font-weight: 900;
      text-decoration: none;
    }

    .feature-empty {
      margin: 0 0 28px;
      border: 1px dashed rgba(15, 23, 42, 0.22);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.75);
      padding: 24px;
      color: #475569;
      font-weight: 800;
      text-align: center;
    }

    .duck-card {
      position: relative;
      display: flex;
      min-height: 430px;
      flex-direction: column;
      overflow: hidden;
      border: 1px solid rgba(15, 23, 42, 0.10);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.88);
      box-shadow: 0 18px 36px rgba(15, 23, 42, 0.10);
    }

    .duck-card::before {
      content: "";
      position: absolute;
      inset: 0 0 auto;
      height: 7px;
      background: var(--duck-accent);
    }

    .duck-portrait {
      display: grid;
      place-items: center;
      margin: 0;
      padding: 24px 18px 8px;
      background: linear-gradient(180deg, var(--duck-surface), rgba(255, 255, 255, 0));
    }

    .duck-portrait svg {
      width: min(100%, 210px);
      height: auto;
    }

    .water {
      fill: #7dd3fc;
    }

    .water-back {
      opacity: 0.72;
    }

    .duck-shadow {
      fill: rgba(15, 23, 42, 0.13);
    }

    .duck-body,
    .duck-head {
      fill: #facc15;
      stroke: #a16207;
      stroke-width: 3;
    }

    .duck-wing {
      fill: #fef08a;
      stroke: #ca8a04;
      stroke-width: 3;
    }

    .duck-beak {
      fill: #fb923c;
      stroke: #c2410c;
      stroke-width: 3;
    }

    .duck-beak-top {
      fill: #fdba74;
    }

    .duck-beak-smile {
      fill: none;
      stroke: #c2410c;
      stroke-linecap: round;
      stroke-width: 3;
    }

    .duck-eye {
      fill: #111827;
    }

    .duck-eye-shine {
      fill: #ffffff;
    }

    .duck-cheek {
      fill: none;
      stroke: #a16207;
      stroke-linecap: round;
      stroke-width: 3;
    }

    .duck-card-content {
      display: flex;
      flex: 1;
      flex-direction: column;
      padding: 18px;
    }

    .duck-card h2 {
      margin: 0;
      color: #111827;
      font-size: 1.24rem;
      line-height: 1.18;
      letter-spacing: 0;
    }

    .duck-category {
      width: fit-content;
      margin: 14px 0 0;
      border-radius: 999px;
      background: var(--duck-surface);
      padding: 7px 10px;
      color: var(--duck-detail);
      font-size: 0.78rem;
      font-weight: 800;
    }

    .duck-tagline {
      margin: 16px 0 20px;
      color: #475569;
      line-height: 1.55;
    }

    .duck-price-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-top: auto;
      border-top: 1px solid rgba(15, 23, 42, 0.10);
      padding-top: 16px;
    }

    .duck-price {
      margin: 0;
      color: #0f172a;
      font-size: 1.35rem;
      font-weight: 900;
    }

    .squeak-button {
      border: 0;
      border-radius: 999px;
      background: #0f172a;
      padding: 10px 14px;
      color: #ffffff;
      font: inherit;
      font-size: 0.86rem;
      font-weight: 800;
    }

    .empty-state {
      border: 1px dashed rgba(15, 23, 42, 0.25);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.75);
      padding: 32px;
      color: #475569;
      text-align: center;
    }

    @media (max-width: 760px) {
      main {
        width: min(100% - 24px, 1180px);
        padding-top: 24px;
      }

      .hero {
        grid-template-columns: 1fr;
        min-height: auto;
      }

      .hero-badge {
        width: min(72vw, 230px);
        min-width: 0;
        justify-self: center;
      }

      .catalog-grid {
        grid-template-columns: 1fr;
      }

      .feature-section {
        grid-template-columns: 1fr;
      }

      .feature-copy {
        padding: 24px;
      }
    }
`;

function renderHeroIllustration(): string {
  return [
    '<div class="hero-badge" aria-hidden="true">',
    '  <svg viewBox="0 0 260 260">',
    '    <circle cx="130" cy="130" r="118" fill="#ffffff" opacity="0.78" />',
    '    <circle cx="130" cy="130" r="104" fill="#bae6fd" />',
    '    <path d="M45 184c27-18 46 16 73 0s47-16 74 0 43 14 59-2v34H45z" fill="#38bdf8" />',
    '    <path d="M83 159c18-34 55-52 95-38 31 11 52 40 55 70 2 28-23 45-66 45h-67c-29 0-46-14-43-35 2-17 11-30 26-42z" fill="#facc15" stroke="#a16207" stroke-width="5" />',
    '    <path d="M112 174c21 6 47 5 70-8-7 27-27 43-57 44-19 1-35-7-45-22 8-11 18-16 32-14z" fill="#fef08a" stroke="#ca8a04" stroke-width="5" />',
    '    <circle cx="94" cy="116" r="48" fill="#facc15" stroke="#a16207" stroke-width="5" />',
    '    <path d="M40 122c-24 2-39 12-39 24 0 14 19 21 49 17 18-2 32-11 38-24-9-12-25-19-48-17z" fill="#fb923c" stroke="#c2410c" stroke-width="5" />',
    '    <circle cx="106" cy="104" r="7" fill="#111827" />',
    '    <circle cx="108" cy="101" r="3" fill="#ffffff" />',
    '  </svg>',
    "</div>",
  ].join("\n");
}

function renderDuck(duck: Duck): string {
  const theme = getTheme(duck.category);

  return [
    `<article class="duck-card" style="--duck-accent: ${theme.accent}; --duck-surface: ${theme.surface}; --duck-detail: ${theme.detail};">`,
    `  ${renderDuckIllustration(duck)}`,
    '  <div class="duck-card-content">',
    `    <h2>${escapeHtml(duck.name)}</h2>`,
    `    <p class="duck-category">${escapeHtml(duck.category)}</p>`,
    `    <p class="duck-tagline">${escapeHtml(duck.tagline)}</p>`,
    '    <div class="duck-price-row">',
    `      <p class="duck-price">${formatPrice(duck.price)}</p>`,
    '      <button class="squeak-button" type="button">Add</button>',
    "    </div>",
    "  </div>",
    "</article>",
  ].join("\n");
}

function renderDuckOfTheDay(ducks: Duck[], today: Date): string {
  const result = selectDuckOfTheDay(ducks, today);

  if (result.kind === "empty") {
    return `<section class="feature-empty">${emptyDuckOfTheDayMessage}</section>`;
  }

  const theme = getTheme(result.duck.category);
  const detailPath = `/ducks/${encodeURIComponent(result.duck.id)}`;

  return [
    `<section class="feature-section" style="--duck-accent: ${theme.accent}; --duck-surface: ${theme.surface}; --duck-detail: ${theme.detail};">`,
    '  <div class="feature-art">',
    `    ${renderDuckIllustration(result.duck)}`,
    "  </div>",
    '  <div class="feature-copy">',
    '    <p class="feature-label">Duck of the Day</p>',
    `    <h2>${escapeHtml(result.duck.name)}</h2>`,
    `    <p class="duck-category">${escapeHtml(result.duck.category)}</p>`,
    `    <p class="duck-tagline">${escapeHtml(result.duck.tagline)}</p>`,
    '    <div class="feature-actions">',
    `      <p class="duck-price">${formatPrice(result.duck.price)}</p>`,
    `      <a class="feature-link" href="${detailPath}">View duck</a>`,
    "    </div>",
    "  </div>",
    "</section>",
  ].join("\n");
}

export function renderCatalogPage(ducks: Duck[], options: { today?: Date } = {}): string {
  const today = options.today ?? new Date();
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
    "  <style>",
    pageStyles,
    "  </style>",
    "</head>",
    "<body>",
    "  <main>",
    '    <section class="hero">',
    '      <div class="hero-copy">',
    '        <p class="eyebrow">Fresh squeaks, tiny prices</p>',
    "        <h1>The Rubber Duck Emporium</h1>",
    '        <p class="hero-text">A cheerful little catalog for debugging companions, thoughtful bath philosophers, and limited-edition ducks with serious shelf presence.</p>',
    '        <div class="shop-meta">',
    `          <span class="pill">${ducks.length} ducks in stock</span>`,
    '          <span class="pill">Handpicked for bath desks</span>',
    '          <span class="pill">Squeak tested</span>',
    "        </div>",
    "      </div>",
    `      ${renderHeroIllustration()}`,
    "    </section>",
    `    ${renderDuckOfTheDay(ducks, today)}`,
    `    ${catalogContent}`,
    "  </main>",
    "</body>",
    "</html>",
  ].join("\n");
}
