"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User, UserRole } from "../types";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string, role?: UserRole) => void;
  logout: () => void;
}

// 1. Create the Context object
const AuthContext = createContext<AuthContextType | null>(null);

// Default mock user
const defaultUser: User = {
  name: "Unknown",
  email: "Unknown@gmail.com",
  role: "Analyst",
  avatar: "U",
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(defaultUser);

  // Sync with localStorage on client mount (SSR-safe)
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("dashboard_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  const login = (name: string, role: UserRole = "Editor") => {
    const newUser: User = {
      name,
      email: `${name.toLowerCase().replace(/\s+/g, ".")}@company.com`,
      role,
      avatar: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
    };
    setUser(newUser);
    localStorage.setItem("dashboard_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dashboard_user");
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 2. Custom hook for consuming the context cleanly
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
