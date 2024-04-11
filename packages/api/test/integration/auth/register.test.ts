import { Express } from "express";
import request from "supertest";

import { build } from "@/app.js";

describe("POST /api/v1/auth/register", () => {
  let app: Express;

  beforeAll(async () => {
    app = await build();
  });

  it("should return a success response when called with valid params", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.header["set-cookie"]).toBeDefined();
  });

  it("should return an error when called with no params", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
  });

  it("should return an error when called with an invalid email", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      email: "invalid-email",
      password: "password",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
    expect(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.body.errors.find((error: any) => {
        return error.field === "email";
      }),
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      response.body.errors.find((error: any) => error.field === "password"),
    ).toBeDefined();
  });
});
