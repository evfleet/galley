import recipeRepository from "./recipe.repository";

async function createRecipe() {
  // do business logic like parsing ingredients before calling repo
  await recipeRepository.createRecipe();

  return "Hello from createRecipe!";
}

export default {
  createRecipe,
};
