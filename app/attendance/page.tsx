"use client";

import { useState } from "react";
import { AttendanceTable } from "@/components/attendance-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddPreviousAttendanceModal } from "@/components/add-previous-attendance-modal";

const dummyLearners = [
  { id: "1", name: "Alice Johnson", status: "present" },
  { id: "2", name: "Bob Smith", status: "absent" },
  { id: "3", name: "Charlie Brown", status: "not marked" },
  { id: "4", name: "Diana Ross", status: "present" },
  { id: "5", name: "Edward Norton", status: "absent" },
  { id: "6", name: "Fiona Apple", status: "present" },
  { id: "7", name: "George Clooney", status: "not marked" },
  { id: "8", name: "Helen Mirren", status: "present" },
  { id: "9", name: "Ian McKellen", status: "absent" },
  { id: "10", name: "Julia Roberts", status: "present" },
  { id: "11", name: "Kevin Bacon", status: "not marked" },
  { id: "12", name: "Laura Dern", status: "present" },
  { id: "13", name: "Michael Caine", status: "absent" },
  { id: "14", name: "Natalie Portman", status: "present" },
  { id: "15", name: "Owen Wilson", status: "not marked" },
];

export default function AttendancePage() {
  const [learners, setLearners] = useState(dummyLearners);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateAttendance = (
    learnerId: string,
    status: "present" | "absent"
  ) => {
    setLearners((prevLearners) =>
      prevLearners.map((learner) =>
        learner.id === learnerId ? { ...learner, status } : learner
      )
    );
  };

  const handleAddPreviousAttendance = (
    date: string,
    attendanceData: { id: string; status: "present" | "absent" }[]
  ) => {
    // In a real application, you would send this data to your backend
    console.log("Adding previous attendance for", date, attendanceData);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Previous Attendance
        </Button>
      </div>
      <AttendanceTable
        learners={learners}
        onUpdateAttendance={handleUpdateAttendance}
      />
      <AddPreviousAttendanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPreviousAttendance}
        learners={learners}
      />
    </div>
  );
}
