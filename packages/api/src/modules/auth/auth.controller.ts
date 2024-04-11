import { SqliteError } from "better-sqlite3";
import { Request, Response } from "express";

import { auth } from "@/config/auth.js";
import { Register } from "@galley/common";
import authService from "./auth.service.js";

async function register(req: Request, res: Response) {
  try {
    const { email, password } = res.locals as Register;
    const { session } = await authService.register({ email, password });

    const sessionCookie = auth.createSessionCookie(session.id);

    return res
      .status(201)
      .set("Set-Cookie", sessionCookie.serialize())
      .send("success");
  } catch (err) {
    if (err instanceof SqliteError && err.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(201).send("fail");
    }

    return res.status(400).send("fail");
  }
}

export default {
  register,
};
