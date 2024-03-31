import { useForm } from "react-hook-form";

import { RecipeFieldArray } from "./RecipeFieldArray";
import { defaultRecipeValues } from "../config/constants";

export type RecipeFormData = {
  name: string;
  description: string;
  ingredients: { value: string }[];
  directions: { value: string }[];
};

export type RecipeFormProps = Partial<RecipeFormData> & {
  onSubmit?: (data: RecipeFormData) => void;
};

export function RecipeForm({
  onSubmit = () => {},
  name = defaultRecipeValues.name,
  description = defaultRecipeValues.description,
  ingredients = defaultRecipeValues.ingredients,
  directions = defaultRecipeValues.directions,
}: RecipeFormProps) {
  const { control, register, handleSubmit } = useForm<RecipeFormData>({
    defaultValues: {
      name,
      description,
      ingredients,
      directions,
    },
  });

  return (
    <form name="recipe-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="name" className="text-lg font-semibold">
          Name
        </label>
        <input id="name" className="w-11/12 border-2" {...register("name")} />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-lg font-semibold">
          Description
        </label>
        <input
          id="description"
          className="w-11/12 border-2"
          {...register("description")}
        />
      </div>

      <RecipeFieldArray
        name="ingredients"
        control={control}
        register={register}
      />

      <RecipeFieldArray
        name="directions"
        control={control}
        register={register}
      />

      <button type="submit" className="bg-gray-500 text-white py-2 px-4">
        Submit
      </button>
    </form>
  );
}
