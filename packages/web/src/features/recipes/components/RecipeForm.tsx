import { useForm } from "react-hook-form";

import { RecipeFieldArray } from "./RecipeFieldArray";

export type RecipeFormData = {
  name: string;
  description: string;
  directions: { value: string }[];
  ingredients: { value: string }[];
};

export type RecipeFormProps = Partial<RecipeFormData> & {
  onSubmit?: (data: RecipeFormData) => void;
};

export function RecipeForm({
  onSubmit = () => {},
  name = "",
  description = "",
  directions = [{ value: "" }],
  ingredients = [{ value: "" }],
}: RecipeFormProps) {
  const { control, register, handleSubmit, watch } = useForm<RecipeFormData>({
    defaultValues: {
      name,
      description,
      directions,
      ingredients,
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
        watch={watch}
      />

      <RecipeFieldArray
        name="directions"
        control={control}
        register={register}
        watch={watch}
      />

      <button type="submit" className="bg-gray-500 text-white py-2 px-4">
        Submit
      </button>
    </form>
  );
}
