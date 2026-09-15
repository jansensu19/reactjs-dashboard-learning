import { createContext, useContext, useState } from "react";

// 1. Create the Context object
const AuthContext = createContext(null);

// Default mock user
const defaultUser = {
  name: "Unknown",
  email: "Unknown@gmail.com",
  role: "Unknown",
  avatar: "U",
};

export function AuthProvider({ children }) {
  // Check localStorage so login persists across page reloads
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("dashboard_user");
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });

  const login = (name, role = "Editor") => {
    const newUser = {
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
