/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

type Learner = {
  id: string;
  name: string;
  status: "present" | "absent" | "not marked";
};

type AttendanceTableProps = {
  learners: Learner[] | any;
  onUpdateAttendance: (learnerId: string, status: "present" | "absent") => void;
};

export function AttendanceTable({
  learners: initialLearners,
  onUpdateAttendance,
}: AttendanceTableProps) {
  const [learners, setLearners] = useState(initialLearners);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 5;

  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format

  const filteredLearners = learners.filter((learner: any) =>
    learner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLearners = filteredLearners.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredLearners.length / itemsPerPage);

  const handleUpdateAttendance = (
    learnerId: string,
    newStatus: "present" | "absent"
  ) => {
    onUpdateAttendance(learnerId, newStatus);
    setLearners((prevLearners: any) =>
      prevLearners.map((learner: any) =>
        learner.id === learnerId ? { ...learner, status: newStatus } : learner
      )
    );
  };

  return (
    <div>
      <div className="mb-4">
        <Label htmlFor="search">Search Learners</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLearners.map((learner: any) => (
              <TableRow key={learner.id}>
                <TableCell>
                  <Link
                    href={`/attendance/${learner.id}`}
                    className="hover:underline"
                  >
                    {learner.name}
                  </Link>
                </TableCell>
                <TableCell>{currentDate}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      learner.status === "present"
                        ? "default"
                        : learner.status === "absent"
                        ? "destructive"
                        : "secondary"
                    }
                  >
                    {learner.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        handleUpdateAttendance(learner.id, "present")
                      }
                      disabled={learner.status === "present"}
                    >
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        handleUpdateAttendance(learner.id, "absent")
                      }
                      disabled={learner.status === "absent"}
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
    </div>
  );
}
