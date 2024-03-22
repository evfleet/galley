import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useUser } from "@/features/auth";

export function PrivateRoute() {
  const navigate = useNavigate();
  const { status, user } = useUser();

  useEffect(() => {
    if (status !== "pending" && !user) {
      navigate("/auth/login");
    }
  }, [navigate, status, user]);

  return <Outlet />;
}
