import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";

type AuthContextType = {
  user?: string;
  setUser: (user: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider() {
  const [user, setUser] = useState("test");

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
