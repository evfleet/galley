import "@testing-library/jest-dom/vitest";
import { render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";

export function setup(jsx: ReactNode, options?: RenderOptions) {
  return {
    user: userEvent.setup(),
    ...render(jsx, options),
  };
}
