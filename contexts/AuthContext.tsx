// contexts/AuthContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load auth state on initial mount
  useEffect(() => {
    const storedAuthState = localStorage.getItem("isLoggedIn");
    if (storedAuthState === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
