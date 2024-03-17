import { useForm, useFieldArray } from "react-hook-form";

export function RecipeForm() {
  const { control, register, handleSubmit, watch } = useForm({
    defaultValues: {
      ingredients: [{ ingredient: "" }],
      directions: [{ direction: "" }],
    },
  });

  const {
    fields: ingredientFields,
    append: ingredientAppend,
    remove: ingredientRemove,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: directionFields,
    append: directionAppend,
    remove: directionRemove,
  } = useFieldArray({
    control,
    name: "directions",
  });

  function onSubmit(data: unknown) {
    console.log(data);
  }

  return (
    <div>
      <h1>Recipe Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h2>Ingredients</h2>
          {ingredientFields.map((field, index) => (
            <div key={field.id}>
              <input {...register(`ingredients.${index}.ingredient`)} />
              {ingredientFields.length > 1 && (
                <button type="button" onClick={() => ingredientRemove(index)}>
                  Delete
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            disabled={
              watch("ingredients")[ingredientFields.length - 1].ingredient ===
              ""
            }
            onClick={() => ingredientAppend({ ingredient: "" })}
          >
            Add
          </button>
        </div>

        <div>
          <h2>Directions</h2>
          {directionFields.map((field, index) => (
            <div key={field.id}>
              <input {...register(`directions.${index}.direction`)} />
              {directionFields.length > 1 && (
                <button type="button" onClick={() => directionRemove(index)}>
                  Delete
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            disabled={
              watch("directions")[directionFields.length - 1].direction === ""
            }
            onClick={() => directionAppend({ direction: "" })}
          >
            Add
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
