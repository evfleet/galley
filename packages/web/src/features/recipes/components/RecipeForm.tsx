import { useForm, useFieldArray } from "react-hook-form";

export function RecipeForm() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      directions: [{ direction: "" }],
    },
  });

  const { fields, append } = useFieldArray({
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
        {fields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`directions.${index}.direction`)} />
            <button type="button" onClick={() => append({ direction: "" })}>
              Add
            </button>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
