import express, { type Express } from "express";

import { loadCatalog } from "./catalog.js";
import { renderCatalogPage } from "./renderCatalog.js";

type AppOptions = {
  catalogPath?: string;
};

export function createApp(options: AppOptions = {}): Express {
  const app = express();

  app.get("/", async (_request, response, next) => {
    try {
      const ducks = await loadCatalog(options.catalogPath);
      const html = renderCatalogPage(ducks);

      response.type("html").send(html);
    } catch (error) {
      next(error);
    }
  });

  return app;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const port = Number(process.env.PORT ?? 3000);
  const app = createApp();

  app.listen(port, () => {
    console.log(`Duck Emporium listening on http://localhost:${port}`);
  });
}
