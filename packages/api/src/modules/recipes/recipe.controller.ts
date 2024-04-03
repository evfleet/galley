import { Request, Response } from "express";

import recipeService from "./recipe.service.js";

async function createRecipe(req: Request, res: Response) {
  const result = await recipeService.createRecipe();

  res.send(result);
}

export default {
  createRecipe,
};
