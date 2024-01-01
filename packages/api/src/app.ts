import express from "express";

export async function build() {
  const app = express();

  app.use(express.json());

  return app;
}
