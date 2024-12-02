"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Learner = {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

type LearnersTableProps = {
  learners: Learner[]
}

export function LearnersTable({ learners: initialLearners }: LearnersTableProps) {
  const [learners, setLearners] = useState(initialLearners)
  const [editingLearner, setEditingLearner] = useState<Learner | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const addLearner = (newLearner: Omit<Learner, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setLearners([...learners, { ...newLearner, id }])
  }

  const updateLearner = (updatedLearner: Learner) => {
    setLearners(learners.map(l => l.id === updatedLearner.id ? updatedLearner : l))
    setEditingLearner(null)
  }

  const deleteLearner = (id: string) => {
    setLearners(learners.filter(l => l.id !== id))
  }

  const filteredLearners = learners.filter(learner =>
    learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    learner.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Learner</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Learner</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              addLearner({
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                address: formData.get('address') as string,
              })
              e.currentTarget.reset()
            }}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" name="email" type="email" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">Phone</Label>
                  <Input id="phone" name="phone" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">Address</Label>
                  <Input id="address" name="address" className="col-span-3" required />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Add Learner</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4">
        <Label htmlFor="search">Search Learners</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search by name or email..."
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
              <TableHead>Email</TableHead>
              <TableHead className="hidden sm:table-cell">Phone</TableHead>
              <TableHead className="hidden md:table-cell">Address</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLearners.map((learner) => (
              <TableRow key={learner.id}>
                <TableCell>{learner.name}</TableCell>
                <TableCell>{learner.email}</TableCell>
                <TableCell className="hidden sm:table-cell">{learner.phone}</TableCell>
                <TableCell className="hidden md:table-cell">{learner.address}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" onClick={() => setEditingLearner(learner)}>Edit</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Learner</DialogTitle>
                        </DialogHeader>
                        {editingLearner && (
                          <form onSubmit={(e) => {
                            e.preventDefault()
                            const formData = new FormData(e.currentTarget)
                            updateLearner({
                              ...editingLearner,
                              name: formData.get('name') as string,
                              email: formData.get('email') as string,
                              phone: formData.get('phone') as string,
                              address: formData.get('address') as string,
                            })
                          }}>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">Name</Label>
                                <Input id="edit-name" name="name" defaultValue={editingLearner.name} className="col-span-3" required />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-email" className="text-right">Email</Label>
                                <Input id="edit-email" name="email" type="email" defaultValue={editingLearner.email} className="col-span-3" required />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-phone" className="text-right">Phone</Label>
                                <Input id="edit-phone" name="phone" defaultValue={editingLearner.phone} className="col-span-3" required />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-address" className="text-right">Address</Label>
                                <Input id="edit-address" name="address" defaultValue={editingLearner.address} className="col-span-3" required />
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <Button type="submit">Update Learner</Button>
                            </div>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" variant="destructive" onClick={() => deleteLearner(learner.id)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

