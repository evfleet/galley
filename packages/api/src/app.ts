import express from "express";
import { pinoHttp } from "pino-http";

import { logger } from "@/config/logger.js";
import { recipeRouter } from "@/modules/recipes/index.js";

export async function build() {
  const app = express();

  app.use(express.json());

  app.use(pinoHttp({ logger }));

  app.use("/api/v1/recipes", recipeRouter);

  app.get("/api/health", async (req, res) => {
    try {
      return res.json({ status: "ok" });
    } catch (err) {
      logger.error(err);
      return res.status(503).json();
    }
  });

  return app;
}
