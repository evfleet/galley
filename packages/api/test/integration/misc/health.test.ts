import { Express } from "express";
import request from "supertest";

import { build } from "@/app.js";

describe("GET /api/health", () => {
  let app: Express;

  beforeAll(async () => {
    app = await build();
  });

  it("should return status 200", async () => {
    const response = await request(app).get("/api/health");
    expect(response.status).toEqual(200);
  });

  it("should return status ok", async () => {
    const response = await request(app).get("/api/health");
    expect(response.body).toEqual({ status: "ok" });
  });
});
