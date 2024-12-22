"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Calendar, BarChart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export function Sidebar() {
  const pathname = usePathname();
  const { handleLogout } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-16 md:w-64 bg-gray-100 h-full p-4 flex flex-col">
      <nav className="space-y-2 flex-grow">
        <Link
          href="/"
          className={`flex items-center space-x-2 p-2 hover:bg-gray-200 rounded ${
            isActive("/") ? "bg-gray-200" : ""
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="hidden md:inline">Home</span>
        </Link>
        <Link
          href="/learners"
          className={`flex items-center space-x-2 p-2 hover:bg-gray-200 rounded ${
            isActive("/learners") ? "bg-gray-200" : ""
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="hidden md:inline">Learners</span>
        </Link>
        <Link
          href="/attendance"
          className={`flex items-center space-x-2 p-2 hover:bg-gray-200 rounded ${
            isActive("/attendance") ? "bg-gray-200" : ""
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span className="hidden md:inline">Attendance</span>
        </Link>
        <Link
          href="/reports"
          className={`flex items-center space-x-2 p-2 hover:bg-gray-200 rounded ${
            isActive("/reports") ? "bg-gray-200" : ""
          }`}
        >
          <BarChart className="h-5 w-5" />
          <span className="hidden md:inline">Reports</span>
        </Link>
      </nav>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span className="hidden md:inline">Logout</span>
      </Button>
    </div>
  );
}
