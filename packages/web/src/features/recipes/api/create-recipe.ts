import { useMutation } from "@tanstack/react-query";

async function createRecipe(recipe: unknown) {
  console.log(recipe);
}

export function useCreateRecipe() {
  return useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      console.log("Success");
    },
  });
}
