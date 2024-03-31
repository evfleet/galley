import { screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { vi } from "vitest";

import { render } from "@/test/render";
import { createQueryWrapper } from "@/test/wrappers/query";
import { RecipeForm } from "./RecipeForm";

expect.extend(toHaveNoViolations);

describe("RecipeForm", () => {
  it("should render the form", () => {
    render(<RecipeForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should render without a11y violations", async () => {
    const { container } = render(<RecipeForm />, {
      wrapper: createQueryWrapper(),
    });

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should render with all the necessary fields", async () => {
    render(<RecipeForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/directions-1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingredients-1/i)).toBeInTheDocument();
  });

  it("should call the onSubmit function in props when submitting the form", async () => {
    const onSubmit = vi.fn();
    const { user } = render(<RecipeForm onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalled();
  });

  it("should only render multiple inputs for the dynamic field that has multiple values", () => {
    render(
      <RecipeForm
        ingredients={[{ value: "Apple" }, { value: "Banana" }]}
        directions={[{ value: "" }]}
      />
    );

    expect(screen.getByLabelText(/ingredients-1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingredients-2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/directions-1/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/directions-2/i)).not.toBeInTheDocument();
  });

  it("should render all the values passed in the props", () => {
    render(
      <RecipeForm
        name="Apple Pie"
        description="An apple pie"
        ingredients={[{ value: "Apple" }, { value: "Pie Crust" }]}
        directions={[{ value: "Peel the apples" }]}
      />
    );

    expect(screen.getByDisplayValue("Apple Pie")).toBeInTheDocument();
    expect(screen.getByDisplayValue("An apple pie")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Apple")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Pie Crust")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Peel the apples")).toBeInTheDocument();
  });
});
