import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { PrivateRoute } from "@/components/PrivateRoute";
import { PublicRoute } from "@/components/PublicRoute";
import { authRoutes } from "@/features/auth";
import { miscRoutes } from "@/features/misc";
import { recipeRoutes } from "@/features/recipes";
import { AuthProvider } from "@/providers/AuthProvider";
import { Layout } from "@/components/Layout";

const router = createBrowserRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            element: <PublicRoute />,
            children: [...authRoutes],
          },
          {
            element: <PrivateRoute />,
            children: [...miscRoutes, ...recipeRoutes],
          },
        ],
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
