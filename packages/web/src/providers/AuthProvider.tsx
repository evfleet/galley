import { createContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

type AuthContextType = {
  user?: string;
  setUser: (user: string) => void;
  status: string;
};

type AuthStatus = "initializing" | "ready";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider() {
  const [user, setUser] = useState("test");
  const [status, setStatus] = useState<AuthStatus>("initializing");

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/v1/auth/");

      console.log(res);

      setStatus("ready");
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, status }}>
      <Outlet />
    </AuthContext.Provider>
  );
}
