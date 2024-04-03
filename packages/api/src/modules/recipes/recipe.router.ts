import { Router } from "express";

import recipeController from "./recipe.controller.js";

export const recipeRouter = Router();

recipeRouter.post("/", recipeController.createRecipe);
