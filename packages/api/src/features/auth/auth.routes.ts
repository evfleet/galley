import { Router } from "express";

import authController from "./auth.controller.js";

const authRouter = Router();

authRouter.get("/", authController.authenticate);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post("/register", authController.register);

export { authRouter };
