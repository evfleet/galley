import { SqliteError } from "better-sqlite3";
import { Request, Response } from "express";

import { auth } from "@/config/auth.js";
import { Login, Register } from "@galley/common";
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

async function login(req: Request, res: Response) {
  try {
    const { email, password } = res.locals as Login;
    const session = await authService.login({ email, password });

    if (!session) {
      return res.status(400).send("fail");
    }

    const sessionCookie = auth.createSessionCookie(session.id);

    return res
      .status(200)
      .set("Set-Cookie", sessionCookie.serialize())
      .send("success");
  } catch (err) {
    return res.status(500).send("fail");
  }
}

async function currentUser(req: Request, res: Response) {
  try {
    const sessionId = req.cookies[auth.sessionCookieName];

    console.log("session", sessionId);

    if (!sessionId) {
      return res.status(401).send({
        user: false,
      });
    }

    const { user, session } = await authService.authenticate(sessionId);

    if (!user || !session) {
      return res.status(401).send({
        user: false,
      });
    }

    return res.status(200).send({
      user: true,
    });
  } catch (err) {
    return res.status(500).send("fail");
  }
}

export default {
  register,
  login,
  currentUser,
};
