import { ReactNode } from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { useUser } from "@/features/auth";

type MainLayoutProps = {
  children: ReactNode;
};

export function MainLayout({ children }: MainLayoutProps) {
  const { status } = useUser();

  return (
    <div>
      <Header />
      <main>{status === "pending" ? <p>Loading...</p> : children}</main>
      <Footer />
    </div>
  );
}
