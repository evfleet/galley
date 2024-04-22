import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useUser } from "@/features/auth";

export function GuestRoute() {
  const navigate = useNavigate();
  const { status, user } = useUser();

  useEffect(() => {
    if (status !== "pending" && user === false) {
      navigate("/");
    }
  }, [navigate, status, user]);

  return <Outlet />;
}
