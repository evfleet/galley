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

  it("should render a single input if not passed multiple values for a dynamic field", () => {
    render(<RecipeForm />);

    expect(screen.queryByLabelText(/directions-2/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/ingredients-2/i)).not.toBeInTheDocument();
  });

  it("should render multiple inputs if passed multiple values for a dynamic field", () => {
    render(
      <RecipeForm directions={[{ value: "Hello" }, { value: "World" }]} />
    );

    expect(screen.getByLabelText(/directions-1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/directions-2/i)).toBeInTheDocument();
  });

  it("should only render multiple inputs for the dynamic field that has multiple values", () => {
    render(
      <RecipeForm
        directions={[{ value: "Hello" }, { value: "World" }]}
        ingredients={[{ value: "" }]}
      />
    );

    expect(screen.getByLabelText(/directions-1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/directions-2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingredients-1/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/ingredients-2/i)).not.toBeInTheDocument();
  });

  it("should render a button to add inputs to dynamic fields", async () => {
    const { user } = render(<RecipeForm directions={[{ value: "Hello" }]} />);

    expect(
      await screen.queryByLabelText(/directions-2/i)
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add direction/i }));

    expect(screen.getByLabelText(/directions-2/i)).toBeInTheDocument();
  });

  it("should disable the button if the last input of the dynamic field is empty", async () => {
    render(<RecipeForm directions={[{ value: "Hello" }, { value: "" }]} />);

    expect(
      screen.getByRole("button", { name: /add direction/i })
    ).toBeDisabled();
  });

  it("should enable the button when a value is input into the last input of the dynamic field", async () => {
    const { user } = render(
      <RecipeForm directions={[{ value: "Hello" }, { value: "" }]} />
    );

    expect(
      screen.getByRole("button", { name: /add direction/i })
    ).toBeDisabled();

    await user.type(screen.getByLabelText(/directions-2/i), "World");

    expect(
      screen.getByRole("button", { name: /add direction/i })
    ).not.toBeDisabled();
  });
});
