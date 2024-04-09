import { Express } from "express";
import request from "supertest";

import { build } from "@/app.js";

describe("POST /api/v1/auth/register", () => {
  let app: Express;

  beforeAll(async () => {
    app = await build();
  });

  it("should return an error when called with no params", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  it("should return an error when called with an invalid email", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "invalid-email",
      password: "password",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(
      response.body.errors.find((error: any) => error.field === "email")
    ).toBeDefined();
  });

  it("should return an error when called with an invalid password", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "test@example.com",
      password: "short",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(
      response.body.errors.find((error: any) => error.field === "password")
    ).toBeDefined();
  });
});
