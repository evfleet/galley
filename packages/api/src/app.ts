import express from "express";
import { pinoHttp } from "pino-http";

import { pool } from "@/config/database.js";
import { logger } from "@/config/logger.js";
import { authRouter } from "./features/auth/auth.routes.js";

export async function build() {
  const app = express();

  app.use(express.json());

  app.use(pinoHttp({ logger }));

  app.use("/auth", authRouter);

  app.get("/", async (req, res) => {
    const result = await pool.query("SELECT NOW()");

    return res.json({ result });
  });

  return app;
}
