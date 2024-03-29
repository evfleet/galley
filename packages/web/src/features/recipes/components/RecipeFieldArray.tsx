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

      <ul>
        {fields.map((field, index) => {
          const labelText = `${name}-${index + 1}`;

          return (
            <li key={field.id} className="flex">
              <label htmlFor={labelText} className="sr-only">
                {labelText}
              </label>
              <input
                {...register(`${name}.${index}.value`)}
                id={labelText}
                className="w-11/12 border-2"
              />
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex w-1/12 items-center justify-center capitalize"
                >
                  <Trash2 />
                  <span className="sr-only">{`Delete ${name.slice(0, -1)} ${
                    index + 1
                  }`}</span>
                </button>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={watch(name)[fields.length - 1].value === ""}
          onClick={() => append({ value: "" })}
          className="bg-gray-400 px-2 py-1 capitalize"
        >
          Add {name.slice(0, -1)}
        </button>
      </div>
    </fieldset>
  );
}
