import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import { useUser } from "@/features/auth";

export function PrivateRoute() {
  const navigate = useNavigate();
  const location = useLocation();
  const { status, data } = useUser();

  useEffect(() => {
    if (status !== "pending" && data.user === false) {
      navigate("/auth/login", {
        state: { from: location.pathname },
      });
    }
  }, [navigate, status, data, location]);

  return <Outlet />;
}
