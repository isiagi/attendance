"use client"

import { useState } from "react"
import { AttendanceTable } from "@/components/attendance-table"

type Learner = {
  id: string
  name: string
  status: "present" | "absent" | "not marked"
}

const initialLearners: Learner[] = [
  {
    id: "1",
    name: "Alice Johnson",
    status: "not marked",
  },
  {
    id: "2",
    name: "Bob Smith",
    status: "not marked",
  },
  {
    id: "3",
    name: "Charlie Brown",
    status: "not marked",
  },
  {
    id: "4",
    name: "Diana Ross",
    status: "not marked",
  },
  {
    id: "5",
    name: "Edward Norton",
    status: "not marked",
  },
  {
    id: "6",
    name: "Fiona Apple",
    status: "not marked",
  },
]

export default function AttendancePage() {
  const [learners, setLearners] = useState(initialLearners)

  const handleUpdateAttendance = (learnerId: string, status: "present" | "absent") => {
    setLearners(prevLearners =>
      prevLearners.map(learner =>
        learner.id === learnerId ? { ...learner, status } : learner
      )
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Attendance</h1>
      <AttendanceTable learners={learners} onUpdateAttendance={handleUpdateAttendance} />
    </div>
  )
}

