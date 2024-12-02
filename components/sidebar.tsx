"use client"

import Link from "next/link"
import { Home, Users, Calendar, BarChart } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-16 md:w-64 bg-gray-100 h-full p-4">
      <nav className="space-y-2">
        <Link href="/" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <Home className="h-5 w-5" />
          <span className="hidden md:inline">Home</span>
        </Link>
        <Link href="/learners" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <Users className="h-5 w-5" />
          <span className="hidden md:inline">Learners</span>
        </Link>
        <Link href="/attendance" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <Calendar className="h-5 w-5" />
          <span className="hidden md:inline">Attendance</span>
        </Link>
        <Link href="/reports" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
          <BarChart className="h-5 w-5" />
          <span className="hidden md:inline">Reports</span>
        </Link>
      </nav>
    </div>
  )
}

