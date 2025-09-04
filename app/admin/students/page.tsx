"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AdminNavigation from "@/components/admin-navigation"
import {
  Search,
  Download,
  Mail,
  Phone,
  MoreVertical,
  Eye,
  UserCheck,
  Users,
  CheckCircle,
  XCircle,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Ban,
} from "lucide-react"

interface Student {
  id: number
  name: string
  email: string
  phone: string
  studentId: string
  department: string
  year: string
  registeredEvents: Array<{
    eventId: number
    eventName: string
    status: string
    paymentStatus: string
    registrationDate: string
    amount: number
  }>
  totalSpent: number
  joinDate: string
  lastActivity: string
  status: "active" | "inactive" | "suspended"
  avatar?: string
}

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [bulkSelectedStudents, setBulkSelectedStudents] = useState<number[]>([])

  // Mock students data
  const students: Student[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@university.edu",
      phone: "+91 9876543210",
      studentId: "STU2024001",
      department: "Computer Science",
      year: "3rd Year",
      registeredEvents: [
        {
          eventId: 1,
          eventName: "Annual Tech Summit 2024",
          status: "confirmed",
          paymentStatus: "paid",
          registrationDate: "March 15, 2024",
          amount: 399,
        },
        {
          eventId: 4,
          eventName: "Winter Hackathon 2024",
          status: "completed",
          paymentStatus: "paid",
          registrationDate: "February 10, 2024",
          amount: 199,
        },
        {
          eventId: 2,
          eventName: "Spring Music Festival",
          status: "confirmed",
          paymentStatus: "paid",
          registrationDate: "March 12, 2024",
          amount: 299,
        },
      ],
      totalSpent: 897,
      joinDate: "January 15, 2024",
      lastActivity: "2 hours ago",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah.wilson@university.edu",
      phone: "+91 9876543211",
      studentId: "STU2024002",
      department: "Electrical Engineering",
      year: "2nd Year",
      registeredEvents: [
        {
          eventId: 2,
          eventName: "Spring Music Festival",
          status: "confirmed",
          paymentStatus: "paid",
          registrationDate: "March 1, 2024",
          amount: 299,
        },
        {
          eventId: 3,
          eventName: "Art Exhibition",
          status: "pending",
          paymentStatus: "pending",
          registrationDate: "March 5, 2024",
          amount: 149,
        },
      ],
      totalSpent: 448,
      joinDate: "February 1, 2024",
      lastActivity: "1 day ago",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@university.edu",
      phone: "+91 9876543212",
      studentId: "STU2024003",
      department: "Mechanical Engineering",
      year: "4th Year",
      registeredEvents: [
        {
          eventId: 1,
          eventName: "Annual Tech Summit 2024",
          status: "confirmed",
          paymentStatus: "paid",
          registrationDate: "March 8, 2024",
          amount: 399,
        },
      ],
      totalSpent: 399,
      joinDate: "January 20, 2024",
      lastActivity: "1 week ago",
      status: "inactive",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@university.edu",
      phone: "+91 9876543213",
      studentId: "STU2024004",
      department: "Business Administration",
      year: "1st Year",
      registeredEvents: [
        {
          eventId: 1,
          eventName: "Annual Tech Summit 2024",
          status: "cancelled",
          paymentStatus: "refunded",
          registrationDate: "March 3, 2024",
          amount: 399,
        },
      ],
      totalSpent: 0,
      joinDate: "March 1, 2024",
      lastActivity: "3 days ago",
      status: "suspended",
    },
  ]

  const departments = [
    "all",
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Business Administration",
    "Civil Engineering",
  ]
  const statuses = ["all", "active", "inactive", "suspended"]
  const years = ["all", "1st Year", "2nd Year", "3rd Year", "4th Year"]

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = selectedDepartment === "all" || student.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || student.status === selectedStatus
    const matchesYear = selectedYear === "all" || student.year === selectedYear

    return matchesSearch && matchesDepartment && matchesStatus && matchesYear
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 text-xs">Inactive</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 text-xs">Suspended</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const getEventStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 text-xs">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 text-xs">Cancelled</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending</Badge>
      case "refunded":
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Refunded</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 text-xs">Failed</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student)
    setShowStudentModal(true)
  }

  const handleEmailStudent = (email: string) => {
    window.location.href = `mailto:${email}`
  }

  const handleCallStudent = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleActivateStudent = (studentId: number) => {
    alert(`Activating student ${studentId}`)
  }

  const handleSuspendStudent = (studentId: number) => {
    if (confirm("Are you sure you want to suspend this student?")) {
      alert(`Suspending student ${studentId}`)
    }
  }

  const handleDeleteStudent = (studentId: number) => {
    if (confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      alert(`Deleting student ${studentId}`)
    }
  }

  const handleExportData = () => {
    const csvContent = [
      ["Name", "Email", "Student ID", "Department", "Year", "Status", "Events", "Total Spent", "Join Date"].join(","),
      ...filteredStudents.map((student) =>
        [
          student.name,
          student.email,
          student.studentId,
          student.department,
          student.year,
          student.status,
          student.registeredEvents.length,
          student.totalSpent,
          student.joinDate,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "students-export.csv"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleBulkAction = (action: string) => {
    if (bulkSelectedStudents.length === 0) {
      alert("Please select students first")
      return
    }

    switch (action) {
      case "activate":
        alert(`Activating ${bulkSelectedStudents.length} students`)
        break
      case "suspend":
        if (confirm(`Are you sure you want to suspend ${bulkSelectedStudents.length} students?`)) {
          alert(`Suspending ${bulkSelectedStudents.length} students`)
        }
        break
      case "email":
        const emails = students
          .filter((s) => bulkSelectedStudents.includes(s.id))
          .map((s) => s.email)
          .join(",")
        window.location.href = `mailto:${emails}`
        break
      case "export":
        const selectedStudentsData = students.filter((s) => bulkSelectedStudents.includes(s.id))
        const csvContent = [
          ["Name", "Email", "Student ID", "Department", "Year", "Status"].join(","),
          ...selectedStudentsData.map((student) =>
            [student.name, student.email, student.studentId, student.department, student.year, student.status].join(
              ",",
            ),
          ),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "selected-students.csv"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        break
    }

    setBulkSelectedStudents([])
  }

  const toggleStudentSelection = (studentId: number) => {
    setBulkSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId],
    )
  }

  const toggleSelectAll = () => {
    if (bulkSelectedStudents.length === filteredStudents.length) {
      setBulkSelectedStudents([])
    } else {
      setBulkSelectedStudents(filteredStudents.map((s) => s.id))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Management</h1>
            <p className="text-gray-600 text-lg">View and manage student registrations and activities</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" onClick={handleExportData} className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{students.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold text-green-600">
                    {students.filter((s) => s.status === "active").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Registrations</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {students.reduce((sum, s) => sum + s.registeredEvents.length, 0)}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-orange-600">
                    ₹{students.reduce((sum, s) => sum + s.totalSpent, 0).toLocaleString()}
                  </p>
                </div>
                <XCircle className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search students by name, email, or ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept === "all" ? "All Departments" : dept}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {bulkSelectedStudents.length > 0 && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-blue-800">
                    {bulkSelectedStudents.length} student{bulkSelectedStudents.length > 1 ? "s" : ""} selected
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction("email")} className="bg-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Selected
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction("activate")} className="bg-white">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Activate
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction("suspend")} className="bg-white">
                    <Ban className="w-4 h-4 mr-2" />
                    Suspend
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleBulkAction("export")} className="bg-white">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Students List</CardTitle>
            <CardDescription>Manage and view all registered students</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4">
                      <input
                        type="checkbox"
                        checked={bulkSelectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="text-left p-4 font-medium text-gray-900 text-sm">Student</th>
                    <th className="text-left p-4 font-medium text-gray-900 text-sm">Department & Year</th>
                    <th className="text-left p-4 font-medium text-gray-900 text-sm">Events</th>
                    <th className="text-left p-4 font-medium text-gray-900 text-sm">Total Spent</th>
                    <th className="text-left p-4 font-medium text-gray-900 text-sm">Status</th>
                    <th className="text-left p-4 font-medium text-gray-900 text-sm">Last Activity</th>
                    <th className="text-left p-4 font-medium text-gray-900 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={bulkSelectedStudents.includes(student.id)}
                          onChange={() => toggleStudentSelection(student.id)}
                          className="rounded"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-medium">
                            {student.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 truncate">{student.name}</div>
                            <div className="text-sm text-gray-600 truncate">{student.email}</div>
                            <div className="text-xs text-gray-500">{student.studentId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{student.department}</div>
                          <div className="text-gray-600">{student.year}</div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-900">{student.registeredEvents.length} events</td>
                      <td className="p-4 text-sm font-medium text-green-600">₹{student.totalSpent.toLocaleString()}</td>
                      <td className="p-4">{getStatusBadge(student.status)}</td>
                      <td className="p-4 text-sm text-gray-600">{student.lastActivity}</td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewStudent(student)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEmailStudent(student.email)}>
                            <Mail className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEmailStudent(student.email)}>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCallStudent(student.phone)}>
                                <Phone className="w-4 h-4 mr-2" />
                                Call Student
                              </DropdownMenuItem>
                              {student.status === "active" ? (
                                <DropdownMenuItem onClick={() => handleSuspendStudent(student.id)}>
                                  <Ban className="w-4 h-4 mr-2" />
                                  Suspend
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleActivateStudent(student.id)}>
                                  <UserCheck className="w-4 h-4 mr-2" />
                                  Activate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteStudent(student.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Student Details Modal */}
        <Dialog open={showStudentModal} onOpenChange={setShowStudentModal}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Student Profile</DialogTitle>
              <DialogDescription>Detailed information about the student</DialogDescription>
            </DialogHeader>
            {selectedStudent && (
              <div className="space-y-6">
                {/* Student Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{selectedStudent.name}</h3>
                    <p className="text-gray-600">{selectedStudent.email}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-gray-600">{selectedStudent.studentId}</span>
                      <span className="text-sm text-gray-600">{selectedStudent.department}</span>
                      <span className="text-sm text-gray-600">{selectedStudent.year}</span>
                      {getStatusBadge(selectedStudent.status)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEmailStudent(selectedStudent.email)}>
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleCallStudent(selectedStudent.phone)}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedStudent.registeredEvents.length}</div>
                    <div className="text-sm text-gray-600">Events Registered</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {selectedStudent.registeredEvents.filter((e) => e.status === "completed").length}
                    </div>
                    <div className="text-sm text-gray-600">Events Attended</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">
                      ₹{selectedStudent.totalSpent.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Spent</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">
                      {selectedStudent.registeredEvents.filter((e) => e.paymentStatus === "paid").length}
                    </div>
                    <div className="text-sm text-gray-600">Payments Made</div>
                  </div>
                </div>

                {/* Event History */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Event Registration History</h4>
                  <div className="space-y-3">
                    {selectedStudent.registeredEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900">{event.eventName}</h5>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-600">Registered: {event.registrationDate}</span>
                            {getEventStatusBadge(event.status)}
                            {getPaymentStatusBadge(event.paymentStatus)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">₹{event.amount}</div>
                        </div>
                      </div>
                    ))}
                    {selectedStudent.registeredEvents.length === 0 && (
                      <div className="text-center py-8 text-gray-500">No event registrations found</div>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-gray-900">{selectedStudent.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Phone</label>
                      <p className="text-gray-900">{selectedStudent.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Join Date</label>
                      <p className="text-gray-900">{selectedStudent.joinDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Activity</label>
                      <p className="text-gray-900">{selectedStudent.lastActivity}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
