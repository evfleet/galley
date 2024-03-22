import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { PrivateRoute } from "@/components/PrivateRoute";
import { authRoutes } from "@/features/auth";
import { miscRoutes } from "@/features/misc";

const router = createBrowserRouter([
  ...authRoutes,
  {
    element: <PrivateRoute />,
    children: [...miscRoutes],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
