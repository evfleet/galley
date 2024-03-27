import { useForm } from "react-hook-form";

import { useCreateRecipe } from "../api/create-recipe";
import { RecipeFieldArray } from "./RecipeFieldArray";

export type RecipeFormData = {
  name: string;
  description: string;
  directions: { value: string }[];
  ingredients: { value: string }[];
};

export function RecipeForm() {
  const { control, register, handleSubmit, watch } = useForm<RecipeFormData>({
    defaultValues: {
      name: "",
      description: "",
      directions: [{ value: "" }],
      ingredients: [{ value: "Hello" }, { value: "World" }],
    },
  });

  const { mutate } = useCreateRecipe();

  function onSubmit(data: RecipeFormData) {
    console.log(data);

    const filteredData = {
      ...data,
      directions: filterValues(data.directions),
      ingredients: filterValues(data.ingredients),
    };

    mutate(filteredData);
  }

  function filterValues(array: { value: string }[]) {
    return array.filter((item) => item.value !== "");
  }

  // function for filtering out empty strings in the state array
  // to use on the onSubmit function
  // function filterEmptyStrings(array: { value: string }[]) {
  //   return array.filter((item) => item.value !== "");
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
