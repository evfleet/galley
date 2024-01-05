import React, { Suspense } from "react";
import { Outlet, RootRoute, Router } from "@tanstack/react-router";

import { authRoutes } from "@/features/auth";

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
      <Outlet />
      <TanStackRouterDevtools />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([...authRoutes]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export { rootRoute, router };
