import { Request, Response } from "express";

import { auth } from "@/config/auth.js";
import { Register } from "@galley/common";
import authService from "./auth.service.js";

async function register(req: Request, res: Response) {
  try {
    const { email, password } = res.locals as Register;
    const user = await authService.register({ email, password });

    const session = await auth.createSession(user.id, {});
    const sessionCookie = auth.createSessionCookie(session.id);

    res.set("Set-Cookie", sessionCookie.serialize()).send("success");
  } catch (err) {
    res.send("fail");
  }
}

export default {
  register,
};
