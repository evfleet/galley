import { Router } from "express";

import { validate } from "@/middleware/validate.js";
import { loginSchema, registerSchema } from "@galley/common";
import authController from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.get("/", authController.currentUser);
