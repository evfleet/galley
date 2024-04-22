import { ReactNode } from "react";

import { useUser } from "@/features/auth";

type AuthLayoutProps = {
  children: ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  const { status } = useUser();

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main>{children}</main>
    </>
  );
}
