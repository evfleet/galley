import { Request, Response } from "express";

import { Register } from "@galley/common";
import authService from "./auth.service.js";

async function register(req: Request, res: Response) {
  try {
    const { email, password } = res.locals as Register;

    await authService.register({ email, password });

    res.send("success");
  } catch (err) {
    res.send("fail");
  }
}

export default {
  register,
};
