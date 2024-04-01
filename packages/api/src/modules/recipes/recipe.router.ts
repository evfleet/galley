import { Router } from "express";

import recipeController from "./recipe.controller";

export const recipeRouter = Router();

recipeRouter.post("/", recipeController.createRecipe);
