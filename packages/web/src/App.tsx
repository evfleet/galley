import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { GuestRoute } from "@/components/GuestRoute";
import { PrivateRoute } from "@/components/PrivateRoute";
import { authRoutes } from "@/features/auth";
import { miscRoutes } from "@/features/misc";
import { recipeRoutes } from "@/features/recipes";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [...authRoutes],
  },
  {
    element: <PrivateRoute />,
    children: [...miscRoutes, ...recipeRoutes],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
