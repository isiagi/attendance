"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

type Learner = {
  id: string;
  name: string;
  status: string;
};

type AddPreviousAttendanceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    date: string,
    attendanceData: { id: string; status: "present" | "absent" }[]
  ) => void;
  learners: Learner[];
};

export function AddPreviousAttendanceModal({
  isOpen,
  onClose,
  onSubmit,
  learners,
}: AddPreviousAttendanceModalProps) {
  const [date, setDate] = useState("");
  const [attendanceData, setAttendanceData] = useState<{
    [key: string]: "present" | "absent";
  }>({});
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLearners = useMemo(() => {
    return learners.filter((learner) =>
      learner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [learners, searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = Object.entries(attendanceData).map(
      ([id, status]) => ({ id, status })
    );
    onSubmit(date, formattedData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Previous Attendance</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="search">Search Learners</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[250px] pr-4">
            {filteredLearners.map((learner) => (
              <div key={learner.id} className="space-y-2 mb-4">
                <Label>{learner.name}</Label>
                <RadioGroup
                  onValueChange={(value) =>
                    setAttendanceData((prev) => ({
                      ...prev,
                      [learner.id]: value as "present" | "absent",
                    }))
                  }
                  defaultValue={attendanceData[learner.id]}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="present"
                      id={`${learner.id}-present`}
                    />
                    <Label htmlFor={`${learner.id}-present`}>Present</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="absent"
                      id={`${learner.id}-absent`}
                    />
                    <Label htmlFor={`${learner.id}-absent`}>Absent</Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </ScrollArea>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
