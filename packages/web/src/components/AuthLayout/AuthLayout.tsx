import { Outlet } from "react-router-dom";

import { useUser } from "@/features/auth";

export function AuthLayout() {
  const { status } = useUser();

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  return <Outlet />;
}
