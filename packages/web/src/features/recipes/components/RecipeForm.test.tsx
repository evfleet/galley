import { screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { setup } from "@/test/setup";
import { createQueryWrapper } from "@/test/wrappers/query";
import { RecipeForm } from "./RecipeForm";

expect.extend(toHaveNoViolations);

describe("RecipeForm", () => {
  it("should render the form", () => {
    setup(<RecipeForm />, {
      wrapper: createQueryWrapper(),
    });

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should render without a11y violations", async () => {
    const { container } = setup(<RecipeForm />, {
      wrapper: createQueryWrapper(),
    });

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should render with all the necessary fields", async () => {
    setup(<RecipeForm />, {
      wrapper: createQueryWrapper(),
    });

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/directions-1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingredients-1/i)).toBeInTheDocument();
  });

  it("should render a single input if not passed multiple values for a dynamic field", () => {
    setup(<RecipeForm />, {
      wrapper: createQueryWrapper(),
    });

    expect(screen.queryByLabelText(/directions-2/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/ingredients-2/i)).not.toBeInTheDocument();
  });

  it("should render multiple inputs if passed multiple values for a dynamic field", () => {
    setup(
      <RecipeForm directions={[{ value: "Hello" }, { value: "World" }]} />,
      {
        wrapper: createQueryWrapper(),
      }
    );

    expect(screen.getByLabelText(/directions-1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/directions-2/i)).toBeInTheDocument();
  });

  it("should only render multiple inputs for the dynamic field that has multiple values", () => {
    setup(
      <RecipeForm
        directions={[{ value: "Hello" }, { value: "World" }]}
        ingredients={[{ value: "" }]}
      />,
      {
        wrapper: createQueryWrapper(),
      }
    );

    expect(screen.getByLabelText(/directions-1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/directions-2/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ingredients-1/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/ingredients-2/i)).not.toBeInTheDocument();
  });

  it("should render a button to add inputs to dynamic fields", async () => {
    const { user } = setup(<RecipeForm directions={[{ value: "Hello" }]} />, {
      wrapper: createQueryWrapper(),
    });

    expect(
      await screen.queryByLabelText(/directions-2/i)
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add direction/i }));

    expect(screen.getByLabelText(/directions-2/i)).toBeInTheDocument();
  });

  it("should disable the button if the last input of the dynamic field is empty", async () => {
    setup(<RecipeForm directions={[{ value: "Hello" }, { value: "" }]} />, {
      wrapper: createQueryWrapper(),
    });

    expect(
      screen.getByRole("button", { name: /add direction/i })
    ).toBeDisabled();
  });

  it("should enable the button when a value is input into the last input of the dynamic field", async () => {
    const { user } = setup(
      <RecipeForm directions={[{ value: "Hello" }, { value: "" }]} />,
      {
        wrapper: createQueryWrapper(),
      }
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
