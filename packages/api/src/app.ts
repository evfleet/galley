import express from "express";
import pino from "pino-http";

import { logger } from "@/config/logger";

export async function build() {
  const app = express();

  app.use(express.json());

  app.use(pino({ logger }));

  return app;
}
