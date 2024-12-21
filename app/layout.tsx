"use client";

import React, { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    // This is a very basic check. In a real app, you'd validate against a backend.
    if (username === "admin" && password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          {isLoggedIn && <Sidebar onLogout={handleLogout} />}
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {React.cloneElement(children as React.ReactElement, {
              isLoggedIn,
              onLogin: handleLogin,
            })}
          </main>
        </div>
      </body>
    </html>
  );
}
