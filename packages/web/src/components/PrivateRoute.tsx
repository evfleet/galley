import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { useUser } from "@/features/auth";

export function PrivateRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { status, user } = useUser();

  useEffect(() => {
    if (status !== "pending" && !user) {
      navigate("/auth/login", {
        state: { from: location.pathname },
      });
    }
  }, [navigate, status, user, location]);

  return <Outlet />;
}
