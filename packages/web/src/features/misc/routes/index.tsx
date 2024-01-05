import { Route } from "@tanstack/react-router";

import { rootRoute } from "@/routes";
import { LandingPage } from "./Landing";

const landingRoute = new Route({
  path: "/",
  component: LandingPage,
  getParentRoute: () => rootRoute,
});

export const miscRoutes = [landingRoute];
