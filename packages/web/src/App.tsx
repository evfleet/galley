import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { authRoutes } from "@/features/auth";
import { miscRoutes, PrivateRoute } from "@/features/misc";

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
