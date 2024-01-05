import { Route } from "@tanstack/react-router";

import { rootRoute } from "@/routes";
import { LoginPage } from "./Login";
import { RegisterPage } from "./Register";

const loginRoute = new Route({
  path: "/auth/login",
  component: LoginPage,
  getParentRoute: () => rootRoute,
});

const registerRoute = new Route({
  path: "/auth/register",
  component: RegisterPage,
  getParentRoute: () => rootRoute,
});

const authRoutes = [loginRoute, registerRoute];

export { authRoutes };
