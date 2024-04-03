import express from "express";
import { pinoHttp } from "pino-http";

import { logger } from "./config/logger.js";
import { recipeRouter } from "./modules/recipes/index.js";

export async function build() {
  const app = express();

  app.use(express.json());

  app.use(pinoHttp({ logger }));

  app.use("/api/recipes", recipeRouter);

  return app;
}
