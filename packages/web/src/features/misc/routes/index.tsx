import { RouteObject } from "react-router-dom";

import { LandingPage } from "./Landing";

export const miscRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
];
