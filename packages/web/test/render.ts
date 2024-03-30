import { RenderOptions, render as renderUI } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";

export function render(jsx: ReactNode, options?: RenderOptions) {
  return {
    user: userEvent.setup(),
    ...renderUI(jsx, options),
  };
}
