import express from "express";
import { pinoHttp } from "pino-http";

import { pool } from "@/config/database.js";
import { logger } from "@/config/logger.js";

export async function build() {
  const app = express();

  app.use(express.json());

  app.use(pinoHttp({ logger }));

  app.get("/", async (req, res) => {
    const result = await pool.query("SELECT NOW()");

    return res.json({ result });
  });

  return app;
}
