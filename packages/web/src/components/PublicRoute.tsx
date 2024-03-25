import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useUser } from "@/features/auth";

export function PublicRoute() {
  const navigate = useNavigate();
  const { status, user } = useUser();

  useEffect(() => {
    if (status !== "pending" && user) {
      navigate("/");
    }
  }, [navigate, status, user]);

  return <Outlet />;
}
