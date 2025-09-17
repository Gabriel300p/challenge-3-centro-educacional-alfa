import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { type UserData } from "../types/auth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));
  const [user, setUser] = useState<UserData | null>(null);
  const isAuthenticated = !!token;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token) as UserData;
        setUser(decoded);
        localStorage.setItem("authToken", token);
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        setToken(null);
        setUser(null);
        localStorage.removeItem("authToken");
      }
    } else {
      setUser(null);
      localStorage.removeItem("authToken");
    }
  }, [token]);

  const login = (authToken: string) => {
    setToken(authToken);
  };

  const logout = () => {
    setToken(null);
    navigate("/login");
  };

  const value = {
    isAuthenticated,
    token,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};