import { Outlet, RootRoute, Route, Router } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

const rootRoute = new RootRoute({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const landingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function LandingPage() {
    return (
      <div>
        <p>Landing</p>
      </div>
    );
  },
});

const routeTree = rootRoute.addChildren([landingRoute]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
