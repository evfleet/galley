import { ReactNode } from "react";
import { useForm, UseFormRegister, Control } from "react-hook-form";
import { screen } from "@testing-library/react";

import { render } from "@/test/render";
import { RecipeFormData } from "./RecipeForm";
import { RecipeFieldArray } from "./RecipeFieldArray";
import { defaultRecipeValues } from "../config/constants";

type MockFormProps = {
  children: (props: {
    register: UseFormRegister<RecipeFormData>;
    control: Control<RecipeFormData>;
  }) => ReactNode;
  directions?: Partial<RecipeFormData["directions"]>;
  ingredients?: Partial<RecipeFormData["ingredients"]>;
};

function MockForm({ children, directions, ingredients }: MockFormProps) {
  const { register, control } = useForm<RecipeFormData>({
    defaultValues: {
      ...defaultRecipeValues,
      directions: directions || defaultRecipeValues.directions,
      ingredients: ingredients || defaultRecipeValues.ingredients,
    },
  });

  return children({ register, control });
}

describe("RecipeFieldArray", () => {
  it("should render the fields", () => {
    render(
      <MockForm>
        {(props) => <RecipeFieldArray name="ingredients" {...props} />}
      </MockForm>
    );

    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("should render single input if not passed multiple values", () => {
    render(
      <MockForm>
        {(props) => <RecipeFieldArray name="ingredients" {...props} />}
      </MockForm>
    );

    expect(screen.queryByLabelText(/ingredients-2/i)).not.toBeInTheDocument();
  });

  it("should render multiple inputs if passed multiple values", async () => {
    render(
      <MockForm ingredients={[{ value: "Apple" }, { value: "Banana" }]}>
        {(props) => <RecipeFieldArray name="ingredients" {...props} />}
      </MockForm>
    );

    expect(screen.getByLabelText(/ingredients-1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingredients-2/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Apple/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Banana/i)).toBeInTheDocument();
  });

  it("should render a button to add inputs", async () => {
    render(
      <MockForm>
        {(props) => <RecipeFieldArray name="ingredients" {...props} />}
      </MockForm>
    );

    expect(
      screen.getByRole("button", { name: /add ingredient/i })
    ).toBeInTheDocument();
  });

  it("should disable the add button if the last input is empty", async () => {
    render(
      <MockForm ingredients={[{ value: "Apple" }, { value: "" }]}>
        {(props) => <RecipeFieldArray name="ingredients" {...props} />}
      </MockForm>
    );

    expect(
      screen.getByRole("button", { name: /add ingredient/i })
    ).toBeDisabled();
  });

  it("should enable the add button when a value is typed into the last input", async () => {
    const { user } = render(
      <MockForm ingredients={[{ value: "Apple" }, { value: "" }]}>
        {(props) => <RecipeFieldArray name="ingredients" {...props} />}
      </MockForm>
    );

    expect(
      screen.getByRole("button", { name: /add ingredient/i })
    ).toBeDisabled();

    await user.type(screen.getByLabelText(/ingredients-2/i), "Banana");

    expect(
      screen.getByRole("button", { name: /add ingredient/i })
    ).not.toBeDisabled();
  });

  it("should add a new input when the add button is clicked", async () => {
    const { user } = render(
      <MockForm ingredients={[{ value: "Apple" }]}>
        {(props) => <RecipeFieldArray name="ingredients" {...props} />}
      </MockForm>
    );

    expect(screen.queryByLabelText(/ingredients-2/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add ingredient/i }));

    expect(screen.getByLabelText(/ingredients-2/i)).toBeInTheDocument();
  });

  it("should render a button to remove inputs", async () => {
    render(
      <MockForm ingredients={[{ value: "Apple" }, { value: "Banana" }]}>
        {(props) => <RecipeFieldArray name="ingredients" {...props} />}
      </MockForm>
    );

    expect(screen.getByText(/delete ingredient 1/i)).toBeInTheDocument();
  });

  it("should not render the remove button if there is only one input", async () => {
    render(
      <MockForm>
        {(props) => <RecipeFieldArray name="ingredients" {...props} />}
      </MockForm>
    );

    expect(screen.queryByText(/delete ingredient 1/i)).not.toBeInTheDocument();
  });

  it("should remove an input when the remove button is clicked", async () => {
    const { user } = render(
      <MockForm ingredients={[{ value: "Apple" }, { value: "Banana" }]}>
        {(props) => <RecipeFieldArray name="ingredients" {...props} />}
      </MockForm>
    );

    expect(screen.getByLabelText(/ingredients-1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingredients-2/i)).toBeInTheDocument();

    await user.click(screen.getByText(/delete ingredient 2/i));

    expect(screen.getByLabelText(/ingredients-1/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/ingredients-2/i)).not.toBeInTheDocument();
  });

  it("should adjust the indexes of the inputs when an input is removed", async () => {
    const { user } = render(
      <MockForm ingredients={[{ value: "Apple" }, { value: "Banana" }]}>
        {(props) => <RecipeFieldArray name="ingredients" {...props} />}
      </MockForm>
    );

    expect(screen.getByDisplayValue(/Banana/i)).toHaveAttribute(
      "name",
      "ingredients.1.value"
    );

    await user.click(screen.getByText(/delete ingredient 1/i));

    expect(screen.getByDisplayValue(/Banana/i)).toHaveAttribute(
      "name",
      "ingredients.0.value"
    );
  });
});
