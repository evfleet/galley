import { Express } from "express";
import request from "supertest";

import { build } from "../../../src/app.js";

describe("GET /api/health", () => {
  let app: Express;

  beforeAll(async () => {
    app = await build();
  });

  it("should return status 200", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toEqual(200);
  });

  it("should return status ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.body).toEqual({ status: "ok" });
  });
});
