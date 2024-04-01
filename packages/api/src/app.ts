import express from "express";
import pino from "pino-http";

import { logger } from "./config/logger";
import { recipeRouter } from "./modules/recipes";

export async function build() {
  const app = express();

  app.use(express.json());

  app.use(pino({ logger }));

  app.use("/api/recipes", recipeRouter);

  return app;
}
