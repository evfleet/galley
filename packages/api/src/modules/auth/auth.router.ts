import { Router } from "express";

import { validate } from "@/middleware/validate.js";
import { registerSchema } from "@galley/common";
import authController from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), authController.register);
