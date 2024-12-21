"use client"

import { HomeStats } from "@/components/home-stats"
import { LoginForm } from "@/components/login-form"

// This is dummy data. In a real application, you would fetch this data from your backend.
const dummyData = {
  totalLearners: 150,
  presentToday: 130,
  absentToday: 20,
  averageAttendance: 92,
  attendanceByDay: [
    { day: 'Mon', present: 140, absent: 10 },
    { day: 'Tue', present: 138, absent: 12 },
    { day: 'Wed', present: 135, absent: 15 },
    { day: 'Thu', present: 132, absent: 18 },
    { day: 'Fri', present: 130, absent: 20 },
  ],
}

type HomePageProps = {
  isLoggedIn: boolean
  onLogin: (username: string, password: string) => void
}

export default function HomePage({ isLoggedIn, onLogin }: HomePageProps) {
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <LoginForm onLogin={onLogin} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Attendance Tracker</h1>
      <HomeStats 
        totalLearners={dummyData.totalLearners}
        presentToday={dummyData.presentToday}
        absentToday={dummyData.absentToday}
        averageAttendance={dummyData.averageAttendance}
        attendanceByDay={dummyData.attendanceByDay}
      />
    </div>
  )
}

