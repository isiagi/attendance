/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type AttendanceRecord = {
  date: string;
  status: "present" | "absent";
};

// This is dummy data. In a real application, you would fetch this data based on the learner's ID.
const initialAttendanceRecords: AttendanceRecord[] = [
  { date: "2023-06-01", status: "present" },
  { date: "2023-06-02", status: "present" },
  { date: "2023-06-03", status: "absent" },
  { date: "2023-06-04", status: "present" },
  { date: "2023-06-05", status: "present" },
  { date: "2023-06-06", status: "absent" },
  { date: "2023-06-07", status: "present" },
  { date: "2023-06-08", status: "present" },
  { date: "2023-06-09", status: "absent" },
  { date: "2023-06-10", status: "present" },
];

export default function LearnerAttendancePage({ params }: any) {
  const [attendanceRecords, setAttendanceRecords] = useState(
    initialAttendanceRecords
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDate, setSearchDate] = useState("");
  const itemsPerPage = 5;

  const filteredRecords = attendanceRecords.filter((record) =>
    record.date.includes(searchDate)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);

  const updateAttendance = (date: string, newStatus: "present" | "absent") => {
    setAttendanceRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.date === date ? { ...record, status: newStatus } : record
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Learner Attendance History</h1>
      <p className="mb-4">Learner ID: {params.id}</p>

      <div className="mb-4">
        <Label htmlFor="date-search">Search by Date</Label>
        <Input
          id="date-search"
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecords.map((record) => (
              <TableRow key={record.date}>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      record.status === "present" ? "default" : "destructive"
                    }
                  >
                    {record.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => updateAttendance(record.date, "present")}
                      disabled={record.status === "present"}
                    >
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateAttendance(record.date, "absent")}
                      disabled={record.status === "absent"}
                    >
                      Absent
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={
                currentPage > 1
                  ? () => setCurrentPage((prev) => Math.max(prev - 1, 1))
                  : undefined
              }
              className={currentPage === 1 ? "disabled-class" : ""}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => setCurrentPage(i + 1)}
                isActive={currentPage === i + 1}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }
              aria-disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="mt-4">
        <Button asChild>
          <Link href="/attendance">Back to Attendance</Link>
        </Button>
      </div>
    </div>
  );
}
