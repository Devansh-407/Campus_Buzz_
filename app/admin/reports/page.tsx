"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import AdminNavigation from "@/components/admin-navigation"
import {
  Download,
  FileText,
  Calendar,
  Users,
  DollarSign,
  BarChart3,
  Search,
  Eye,
  Trash2,
  Plus,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface Report {
  id: number
  name: string
  type: string
  description: string
  generatedDate: string
  size: string
  format: string
  status: "ready" | "generating" | "failed"
  downloadCount: number
  createdBy: string
}

interface ReportTemplate {
  id: number
  name: string
  description: string
  icon: any
  fields: string[]
  category: string
  estimatedTime: string
}

interface ScheduledReport {
  id: number
  name: string
  frequency: string
  nextRun: string
  lastRun: string
  status: "active" | "paused"
  recipients: string[]
}

export default function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [customReportData, setCustomReportData] = useState({
    name: "",
    description: "",
    dateRange: { from: "", to: "" },
    includeEvents: true,
    includeStudents: true,
    includeRevenue: true,
    includeFeedback: false,
    format: "pdf",
    emailReport: false,
    recipients: "",
  })

  // Mock reports data
  const availableReports: Report[] = [
    {
      id: 1,
      name: "Monthly Revenue Report",
      type: "revenue",
      description: "Comprehensive revenue analysis for the selected month including payment breakdowns",
      generatedDate: "March 15, 2024",
      size: "2.3 MB",
      format: "PDF",
      status: "ready",
      downloadCount: 12,
      createdBy: "Admin",
    },
    {
      id: 2,
      name: "Student Participation Report",
      type: "participation",
      description: "Student engagement and participation statistics across all events",
      generatedDate: "March 14, 2024",
      size: "1.8 MB",
      format: "Excel",
      status: "ready",
      downloadCount: 8,
      createdBy: "Admin",
    },
    {
      id: 3,
      name: "Event Performance Analysis",
      type: "events",
      description: "Detailed analysis of event success metrics and attendance patterns",
      generatedDate: "March 13, 2024",
      size: "3.1 MB",
      format: "PDF",
      status: "ready",
      downloadCount: 15,
      createdBy: "Admin",
    },
    {
      id: 4,
      name: "Payment Methods Breakdown",
      type: "payments",
      description: "Analysis of payment preferences and transaction success rates",
      generatedDate: "March 12, 2024",
      size: "1.2 MB",
      format: "CSV",
      status: "generating",
      downloadCount: 0,
      createdBy: "Admin",
    },
    {
      id: 5,
      name: "Feedback Analysis Report",
      type: "feedback",
      description: "Compilation and sentiment analysis of student feedback",
      generatedDate: "March 10, 2024",
      size: "2.7 MB",
      format: "PDF",
      status: "failed",
      downloadCount: 0,
      createdBy: "Admin",
    },
  ]

  const reportTemplates: ReportTemplate[] = [
    {
      id: 1,
      name: "Event Summary Report",
      description: "Overview of event performance, attendance, and revenue",
      icon: Calendar,
      fields: ["Event Details", "Attendance", "Revenue", "Feedback"],
      category: "Events",
      estimatedTime: "2-3 minutes",
    },
    {
      id: 2,
      name: "Student Analytics Report",
      description: "Student participation patterns and demographics",
      icon: Users,
      fields: ["Demographics", "Participation", "Spending", "Preferences"],
      category: "Students",
      estimatedTime: "3-4 minutes",
    },
    {
      id: 3,
      name: "Financial Report",
      description: "Comprehensive financial analysis and trends",
      icon: DollarSign,
      fields: ["Revenue", "Expenses", "Profit", "Trends"],
      category: "Finance",
      estimatedTime: "4-5 minutes",
    },
    {
      id: 4,
      name: "Performance Dashboard",
      description: "Key performance indicators and metrics",
      icon: BarChart3,
      fields: ["KPIs", "Growth", "Comparisons", "Forecasts"],
      category: "Analytics",
      estimatedTime: "5-6 minutes",
    },
  ]

  const scheduledReports: ScheduledReport[] = [
    {
      id: 1,
      name: "Weekly Revenue Summary",
      frequency: "Weekly",
      nextRun: "March 22, 2024",
      lastRun: "March 15, 2024",
      status: "active",
      recipients: ["admin@university.edu", "finance@university.edu"],
    },
    {
      id: 2,
      name: "Monthly Student Report",
      frequency: "Monthly",
      nextRun: "April 1, 2024",
      lastRun: "March 1, 2024",
      status: "active",
      recipients: ["admin@university.edu"],
    },
  ]

  const reportTypes = ["all", "revenue", "events", "participation", "payments", "feedback"]

  const filteredReports = availableReports.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedReportType === "all" || report.type === selectedReportType
    return matchesSearch && matchesType
  })

  const handleGenerateReport = async (templateId: number) => {
    const template = reportTemplates.find((t) => t.id === templateId)
    if (!template) return

    try {
      alert(`Generating ${template.name}... This will take approximately ${template.estimatedTime}.`)

      // Simulate report generation
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert(`${template.name} generated successfully!`)
    } catch (error) {
      alert("Error generating report. Please try again.")
    }
  }

  const handleDownloadReport = (reportId: number) => {
    const report = availableReports.find((r) => r.id === reportId)
    if (!report) return

    if (report.status !== "ready") {
      alert("Report is not ready for download yet.")
      return
    }

    // Simulate download
    alert(`Downloading ${report.name} (${report.size})...`)
  }

  const handleDeleteReport = (reportId: number) => {
    if (confirm("Are you sure you want to delete this report?")) {
      alert(`Report ${reportId} deleted successfully!`)
    }
  }

  const handlePreviewReport = (reportId: number) => {
    const report = availableReports.find((r) => r.id === reportId)
    if (!report) return

    if (report.status !== "ready") {
      alert("Report is not ready for preview yet.")
      return
    }

    alert(`Opening preview for ${report.name}...`)
  }

  const handleCustomReportGeneration = async () => {
    if (!customReportData.name.trim()) {
      alert("Please enter a report name.")
      return
    }

    try {
      alert("Generating custom report...")
      await new Promise((resolve) => setTimeout(resolve, 3000))
      alert("Custom report generated successfully!")

      // Reset form
      setCustomReportData({
        name: "",
        description: "",
        dateRange: { from: "", to: "" },
        includeEvents: true,
        includeStudents: true,
        includeRevenue: true,
        includeFeedback: false,
        format: "pdf",
        emailReport: false,
        recipients: "",
      })
    } catch (error) {
      alert("Error generating custom report. Please try again.")
    }
  }

  const handleScheduleReport = (reportId: number) => {
    alert(`Setting up schedule for report ${reportId}...`)
  }

  const handleToggleScheduledReport = (reportId: number, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active"
    alert(`${newStatus === "active" ? "Activating" : "Pausing"} scheduled report ${reportId}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return (
          <Badge className="bg-green-100 text-green-800 text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            Ready
          </Badge>
        )
      case "generating":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Generating
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-800 text-xs">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const getFormatBadge = (format: string) => {
    const colors = {
      PDF: "bg-red-100 text-red-800",
      Excel: "bg-green-100 text-green-800",
      CSV: "bg-blue-100 text-blue-800",
    }
    return <Badge className={`${colors[format as keyof typeof colors]} text-xs`}>{format}</Badge>
  }

  const getScheduleStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
      case "paused":
        return <Badge className="bg-gray-100 text-gray-800 text-xs">Paused</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
            <p className="text-gray-600 text-lg">Generate and download comprehensive reports</p>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex-shrink-0"
            onClick={() => document.getElementById("custom-report-tab")?.click()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Custom Report
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Reports</p>
                  <p className="text-2xl font-bold">{availableReports.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Generated This Month</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {availableReports.reduce((sum, r) => sum + r.downloadCount, 0)}
                  </p>
                </div>
                <Download className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Scheduled Reports</p>
                  <p className="text-2xl font-bold text-purple-600">{scheduledReports.length}</p>
                </div>
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="templates">Report Templates</TabsTrigger>
            <TabsTrigger value="existing">Generated Reports</TabsTrigger>
            <TabsTrigger value="custom" id="custom-report-tab">
              Custom Report
            </TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>

          {/* Report Templates Tab */}
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportTemplates.map((template) => {
                const Icon = template.icon
                return (
                  <Card key={template.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg text-gray-900 mb-1">{template.name}</CardTitle>
                          <CardDescription className="text-sm text-gray-600 leading-relaxed">
                            {template.description}
                          </CardDescription>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {template.category}
                            </Badge>
                            <span className="text-xs text-gray-500">Est. {template.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium mb-2 text-gray-900">Included Fields:</div>
                          <div className="flex flex-wrap gap-2">
                            {template.fields.map((field, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {field}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          onClick={() => handleGenerateReport(template.id)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Generate Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Generated Reports Tab */}
          <TabsContent value="existing">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Generated Reports</CardTitle>
                  <CardDescription>Download and manage your previously generated reports</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <select
                    value={selectedReportType}
                    onChange={(e) => setSelectedReportType(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    {reportTypes.map((type) => (
                      <option key={type} value={type}>
                        {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4 min-w-0 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-gray-900 truncate">{report.name}</h3>
                            {getStatusBadge(report.status)}
                            {getFormatBadge(report.format)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{report.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                            <span>Generated: {report.generatedDate}</span>
                            <span>Size: {report.size}</span>
                            <span>Downloads: {report.downloadCount}</span>
                            <span>By: {report.createdBy}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePreviewReport(report.id)}
                          disabled={report.status !== "ready"}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Preview</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReport(report.id)}
                          disabled={report.status !== "ready"}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Download</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleScheduleReport(report.id)}
                          disabled={report.status !== "ready"}
                        >
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="hidden sm:inline">Schedule</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteReport(report.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {filteredReports.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No reports found</h3>
                      <p className="text-gray-600">Try adjusting your search criteria or generate a new report.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Custom Report Tab */}
          <TabsContent value="custom">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>Create personalized reports with specific data points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Basic Information</h3>
                      <div>
                        <Label htmlFor="reportName">Report Name</Label>
                        <Input
                          id="reportName"
                          value={customReportData.name}
                          onChange={(e) => setCustomReportData((prev) => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter report name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reportDescription">Description</Label>
                        <Textarea
                          id="reportDescription"
                          value={customReportData.description}
                          onChange={(e) => setCustomReportData((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe your custom report"
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Date Range */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Date Range</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="dateFrom">From Date</Label>
                          <Input
                            id="dateFrom"
                            type="date"
                            value={customReportData.dateRange.from}
                            onChange={(e) =>
                              setCustomReportData((prev) => ({
                                ...prev,
                                dateRange: { ...prev.dateRange, from: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="dateTo">To Date</Label>
                          <Input
                            id="dateTo"
                            type="date"
                            value={customReportData.dateRange.to}
                            onChange={(e) =>
                              setCustomReportData((prev) => ({
                                ...prev,
                                dateRange: { ...prev.dateRange, to: e.target.value },
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Data Sources */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Data Sources</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="includeEvents"
                            checked={customReportData.includeEvents}
                            onCheckedChange={(checked) =>
                              setCustomReportData((prev) => ({ ...prev, includeEvents: checked }))
                            }
                          />
                          <Label htmlFor="includeEvents">Event Data</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="includeStudents"
                            checked={customReportData.includeStudents}
                            onCheckedChange={(checked) =>
                              setCustomReportData((prev) => ({ ...prev, includeStudents: checked }))
                            }
                          />
                          <Label htmlFor="includeStudents">Student Registrations</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="includeRevenue"
                            checked={customReportData.includeRevenue}
                            onCheckedChange={(checked) =>
                              setCustomReportData((prev) => ({ ...prev, includeRevenue: checked }))
                            }
                          />
                          <Label htmlFor="includeRevenue">Revenue Data</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="includeFeedback"
                            checked={customReportData.includeFeedback}
                            onCheckedChange={(checked) =>
                              setCustomReportData((prev) => ({ ...prev, includeFeedback: checked }))
                            }
                          />
                          <Label htmlFor="includeFeedback">Feedback Data</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Output Format */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Output Format</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="formatPdf"
                            name="format"
                            value="pdf"
                            checked={customReportData.format === "pdf"}
                            onChange={(e) => setCustomReportData((prev) => ({ ...prev, format: e.target.value }))}
                          />
                          <Label htmlFor="formatPdf">PDF Report</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="formatCsv"
                            name="format"
                            value="csv"
                            checked={customReportData.format === "csv"}
                            onChange={(e) => setCustomReportData((prev) => ({ ...prev, format: e.target.value }))}
                          />
                          <Label htmlFor="formatCsv">CSV Data</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="formatExcel"
                            name="format"
                            value="excel"
                            checked={customReportData.format === "excel"}
                            onChange={(e) => setCustomReportData((prev) => ({ ...prev, format: e.target.value }))}
                          />
                          <Label htmlFor="formatExcel">Excel Spreadsheet</Label>
                        </div>
                      </div>
                    </div>

                    {/* Email Options */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Delivery Options</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="emailReport"
                            checked={customReportData.emailReport}
                            onCheckedChange={(checked) =>
                              setCustomReportData((prev) => ({ ...prev, emailReport: checked }))
                            }
                          />
                          <Label htmlFor="emailReport">Email report when ready</Label>
                        </div>
                        {customReportData.emailReport && (
                          <div>
                            <Label htmlFor="recipients">Email Recipients</Label>
                            <Input
                              id="recipients"
                              value={customReportData.recipients}
                              onChange={(e) => setCustomReportData((prev) => ({ ...prev, recipients: e.target.value }))}
                              placeholder="email1@example.com, email2@example.com"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Generate Button */}
                    <div className="pt-4">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={handleCustomReportGeneration}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Generate Custom Report
                      </Button>
                    </div>

                    {/* Preview */}
                    {customReportData.name && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium mb-2">Report Preview</h4>
                        <div className="text-sm space-y-1">
                          <p>
                            <strong>Name:</strong> {customReportData.name}
                          </p>
                          <p>
                            <strong>Format:</strong> {customReportData.format.toUpperCase()}
                          </p>
                          <p>
                            <strong>Data Sources:</strong>{" "}
                            {[
                              customReportData.includeEvents && "Events",
                              customReportData.includeStudents && "Students",
                              customReportData.includeRevenue && "Revenue",
                              customReportData.includeFeedback && "Feedback",
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                          {customReportData.dateRange.from && customReportData.dateRange.to && (
                            <p>
                              <strong>Date Range:</strong> {customReportData.dateRange.from} to{" "}
                              {customReportData.dateRange.to}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Reports Tab */}
          <TabsContent value="scheduled">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>Set up automatic report generation and delivery</CardDescription>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule New Report
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledReports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 truncate">{report.name}</h3>
                          {getScheduleStatusBadge(report.status)}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Frequency:</span> {report.frequency}
                          </div>
                          <div>
                            <span className="font-medium">Next Run:</span> {report.nextRun}
                          </div>
                          <div>
                            <span className="font-medium">Last Run:</span> {report.lastRun}
                          </div>
                          <div>
                            <span className="font-medium">Recipients:</span> {report.recipients.length}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleScheduledReport(report.id, report.status)}
                        >
                          {report.status === "active" ? "Pause" : "Activate"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {scheduledReports.length === 0 && (
                    <div className="text-center py-12">
                      <Clock className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Scheduled Reports</h3>
                      <p className="text-gray-600 mb-4">Set up automatic report generation to save time</p>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Plus className="w-4 h-4 mr-2" />
                        Schedule Your First Report
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
