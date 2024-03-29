import {
  Control,
  UseFormRegister,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";
import { Trash2 } from "lucide-react";

import type { RecipeFormData } from "./RecipeForm";

type FieldArrays<T> = {
  [K in keyof T]: T[K] extends unknown[] ? K : never;
}[keyof T];

type RecipeFieldArrayProps = {
  name: FieldArrays<RecipeFormData>;
  control: Control<RecipeFormData>;
  register: UseFormRegister<RecipeFormData>;
  watch: UseFormWatch<RecipeFormData>;
};

export function RecipeFieldArray({
  name,
  control,
  register,
  watch,
}: RecipeFieldArrayProps) {
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  });

  return (
    <fieldset
      aria-labelledby={`${name}-legend`}
      className="flex flex-col gap-2"
    >
      <legend
        id={`${name}-legend`}
        className="text-lg font-semibold capitalize"
      >
        {name}
      </legend>

      {fields.map((field, index) => (
        <div key={field.id} className="flex">
          <input
            {...register(`${name}.${index}.value`)}
            className="w-11/12 border-2"
          />
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex w-1/12 items-center justify-center"
            >
              <Trash2 />
              <span className="sr-only">Delete</span>
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          disabled={watch(name)[fields.length - 1].value === ""}
          onClick={() => append({ value: "" })}
          className="bg-gray-400 px-2 py-1"
        >
          Add
        </button>
      </div>
    </fieldset>
  );
}
