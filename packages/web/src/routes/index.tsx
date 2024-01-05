import React, { Suspense } from "react";
import { Link, Outlet, RootRoute, Router } from "@tanstack/react-router";

import { authRoutes } from "@/features/auth";
import { miscRoutes } from "@/features/misc";

// eslint-disable-next-line
const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : React.lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

const rootRoute = new RootRoute({
  component: () => (
    <Suspense>
      <div>
        <Link to="/">Home</Link>
        <Link to="/auth/login">Login</Link>
        <Link to="/auth/register">Register</Link>
      </div>

      <Outlet />
      <TanStackRouterDevtools />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([...authRoutes, ...miscRoutes]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { rootRoute, router };
