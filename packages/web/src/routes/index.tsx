import { createBrowserRouter } from "react-router-dom";

import { authRoutes } from "@/features/auth";
import { miscRoutes } from "@/features/misc";

export const router = createBrowserRouter([...authRoutes, ...miscRoutes]);
