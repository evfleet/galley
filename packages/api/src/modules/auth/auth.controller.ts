import { Request, Response } from "express";
import { z } from "zod";

import { registerSchema } from "@galley/common";

async function register(req: Request, res: Response) {
  try {
    const { email, password } = res.locals as z.infer<typeof registerSchema>;

    console.log("email", email);
    console.log("password", password);

    res.send("success");
  } catch (err) {
    res.send("fail");
  }
}

export default {
  register,
};
