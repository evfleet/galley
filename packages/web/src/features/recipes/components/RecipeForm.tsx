import { useForm } from "react-hook-form";

import { RecipeFieldArray } from "./RecipeFieldArray";

export type RecipeFormData = {
  name: string;
  description: string;
  ingredients: { value: string }[];
  directions: { value: string }[];
};

export function RecipeForm() {
  const { control, register, handleSubmit, watch } = useForm<RecipeFormData>({
    defaultValues: {
      name: "",
      description: "",
      ingredients: [{ value: "Hello" }, { value: "World" }],
      directions: [{ value: "" }],
    },
  });

  function onSubmit(data: unknown) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label className="text-lg font-semibold">Name</label>
        <input className="w-11/12 border-2" {...register("name")} />
      </div>

      <div className="flex flex-col">
        <label className="text-lg font-semibold">Description</label>
        <input className="w-11/12 border-2" {...register("description")} />
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
