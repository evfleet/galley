import express from "express";
import pino from "pino-http";

import { pool } from ".//config/database";
import { logger } from "./config/logger";

export async function build() {
  const app = express();

  app.use(express.json());

  app.use(pino({ logger }));

  app.get("/", async (req, res) => {
    const result = await pool.query("SELECT NOW()");

    return res.json({ result });
  });

  return app;
}
