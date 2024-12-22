"use client";

import { useState } from "react";
import { LearnersTable } from "@/components/learners-table";
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const dummyLearners = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "123-456-7890",
    address: "123 Main St, City, Country",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "555-123-4567",
    address: "456 Elm St, Town, Country",
  },
  {
    id: "3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "987-654-3210",
    address: "789 Oak Ave, Village, Country",
  },
  {
    id: "4",
    name: "Diana Ross",
    email: "diana@example.com",
    phone: "456-789-0123",
    address: "321 Pine Rd, City, Country",
  },
  {
    id: "5",
    name: "Edward Norton",
    email: "edward@example.com",
    phone: "789-012-3456",
    address: "654 Maple Ln, Town, Country",
  },
  {
    id: "6",
    name: "Fiona Apple",
    email: "fiona@example.com",
    phone: "012-345-6789",
    address: "987 Cedar St, Village, Country",
  },
];

export default function LearnersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(dummyLearners.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLearners = dummyLearners.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Learners</h1>
      <LearnersTable learners={currentLearners} />
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
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
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
