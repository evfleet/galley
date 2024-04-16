import { Outlet } from "react-router-dom";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { useUser } from "@/features/auth";

export function Layout() {
  const { status } = useUser();

  return (
    <div>
      <Header />
      <main>{status === "pending" ? <p>Loading...</p> : <Outlet />}</main>
      <Footer />
    </div>
  );
}
