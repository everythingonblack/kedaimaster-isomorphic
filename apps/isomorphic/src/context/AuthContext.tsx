import React, { createContext, useState, useEffect } from "react";
import { getTokens, clearTokens, isAuthenticated } from "@/services/authService";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any;
  login: (user: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      setAuthState({ isAuthenticated: auth, user: auth ? await getProfile() : null });
    };
    checkAuth();
  }, []);

  const login = (user: any) => {
    setAuthState({ isAuthenticated: true, user });
  };

  const logout = () => {
    clearTokens();
    setAuthState({ isAuthenticated: false, user: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};