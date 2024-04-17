import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { AuthLayout } from "@/components/AuthLayout";
import { GuestRoute } from "@/components/GuestRoute";
import { MainLayout } from "@/components/MainLayout";
import { PrivateRoute } from "@/components/PrivateRoute";
import { authRoutes } from "@/features/auth";
import { miscRoutes } from "@/features/misc";
import { recipeRoutes } from "@/features/recipes";

const router = createBrowserRouter([
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [...authRoutes],
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [...miscRoutes, ...recipeRoutes],
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
