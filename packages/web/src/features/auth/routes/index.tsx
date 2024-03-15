import { RouteObject } from "react-router-dom";

import { LoginPage } from "./Login";
import { RegisterPage } from "./Register";

export const authRoutes: RouteObject[] = [
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/register", element: <RegisterPage /> },
];
