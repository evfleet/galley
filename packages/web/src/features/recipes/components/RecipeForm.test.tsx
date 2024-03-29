import { screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { setup } from "@/test/setup";
import { createQueryWrapper } from "@/test/wrappers/query";
import { RecipeForm } from "./RecipeForm";

expect.extend(toHaveNoViolations);

describe("RecipeForm", () => {
  it("renders the form", () => {
    setup(<RecipeForm />, {
      wrapper: createQueryWrapper(),
    });

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("renders without a11y violations", async () => {
    const { container } = setup(<RecipeForm />, {
      wrapper: createQueryWrapper(),
    });

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
