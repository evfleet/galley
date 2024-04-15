import { Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/useAuth";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Layout() {
  const { status } = useAuth();

  return (
    <div>
      <Header />
      <main>{status === "initializing" ? <p>Loading...</p> : <Outlet />}</main>
      <Footer />
    </div>
  );
}
