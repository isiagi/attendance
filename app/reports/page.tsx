"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, FileSpreadsheet, FileIcon as FilePdf, Mail } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

export default function ReportsPage() {
  const [reportType, setReportType] = useState("daily")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)
  const [email, setEmail] = useState("")

  const handleDownload = (format: "excel" | "pdf") => {
    // In a real application, this would trigger the download
    console.log(`Downloading ${reportType} report from ${startDate} to ${endDate} in ${format} format`)
  }

  const handleEmailReport = () => {
    setIsEmailModalOpen(true)
  }

  const sendEmailReport = () => {
    // In a real application, this would send an email with the report
    console.log(`Emailing ${reportType} report from ${startDate} to ${endDate} to ${email}`)
    setIsEmailModalOpen(false)
    setEmail("")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Attendance Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>Select the type of report and date range</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="report-type">Report Type</Label>
            <Select onValueChange={setReportType} defaultValue={reportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily Report</SelectItem>
                <SelectItem value="weekly">Weekly Report</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => handleDownload("excel")}>
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Download Excel
            </Button>
            <Button onClick={() => handleDownload("pdf")}>
              <FilePdf className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button onClick={handleEmailReport}>
              <Mail className="mr-2 h-4 w-4" />
              Email Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Email Report</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="Enter email address"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={sendEmailReport}>Send Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

