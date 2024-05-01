import { MainLayout } from "@/components/MainLayout";
import { RecipeForm } from "../components/RecipeForm";
import { RecipeFormData } from "../components/RecipeForm";

export function CreateRecipePage() {
  async function handleCreate(recipe: RecipeFormData) {
    console.log(recipe);
  }

  return (
    <MainLayout>
      <h1>Create Recipe</h1>
      <RecipeForm onSubmit={handleCreate} />
    </MainLayout>
  );
}
