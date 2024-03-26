import { RouteObject } from "react-router-dom";

import { CreateRecipePage } from "./CreateRecipe";

export const recipeRoutes: RouteObject[] = [
  { path: "/recipes/create", element: <CreateRecipePage /> },
];
