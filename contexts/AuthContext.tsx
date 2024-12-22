"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  handleLogin: (username: string, password: string) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedAuthState = localStorage.getItem("isLoggedIn");
    if (storedAuthState === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (username: string, password: string) => {
    try {
      // In real app, replace with actual API call
      if (username === "admin" && password === "password") {
        router.push("/");
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      // Better error handling
      console.error(error);
      alert(error instanceof Error ? error.message : "Login failed");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    // router.push("/login");
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
