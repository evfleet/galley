import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useUser } from "@/features/auth";

export function GuestRoute() {
  const navigate = useNavigate();
  const { status, data } = useUser();

  useEffect(() => {
    if (status !== "pending" && data.user !== false) {
      navigate("/");
    }
  }, [navigate, status, data]);

  return <Outlet />;
}
