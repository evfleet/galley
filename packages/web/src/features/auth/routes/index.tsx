import { RouteObject } from "react-router-dom";

import { LoginPage } from "./Login";
import { RegisterPage } from "./Register";
import { ResetPasswordPage } from "./ResetPassword";

export const authRoutes: RouteObject[] = [
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/register", element: <RegisterPage /> },
  { path: "/auth/forgot-password", element: <ResetPasswordPage /> },
];
