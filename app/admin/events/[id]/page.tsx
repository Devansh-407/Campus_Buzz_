"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminNavigation from "@/components/admin-navigation"
import {
  ArrowLeft,
  Edit,
  Users,
  DollarSign,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Download,
  Eye,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-react"

interface EventDetails {
  id: number
  title: string
  description: string
  category: string
  date: string
  time: string
  venue: string
  price: number
  maxParticipants: number
  registrations: number
  revenue: number
  status: string
  published: boolean
  contactEmail: string
  contactPhone: string
  createdAt: string
  image?: string
}

interface Registration {
  id: number
  studentName: string
  studentEmail: string
  registrationDate: string
  paymentStatus: string
  amount: number
}

interface Feedback {
  id: number
  studentName: string
  rating: number
  comment: string
  submittedAt: string
}

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<EventDetails | null>(null)
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch event details
    const fetchEventDetails = async () => {
      try {
        // Mock data - in real app, this would come from API
        const mockEvent: EventDetails = {
          id: Number.parseInt(params.id),
          title: "Annual Tech Summit 2024",
          description:
            "Join industry leaders and innovators for cutting-edge technology discussions, networking opportunities, and hands-on workshops. This premier event brings together students, professionals, and thought leaders to explore the latest trends in technology.",
          category: "Technology",
          date: "March 25, 2024",
          time: "10:00 AM - 6:00 PM",
          venue: "Engineering Block A, Main Auditorium",
          price: 399,
          maxParticipants: 300,
          registrations: 245,
          revenue: 97755,
          status: "upcoming",
          published: true,
          contactEmail: "techsummit@university.edu",
          contactPhone: "+91 98765 43210",
          createdAt: "March 1, 2024",
          image: "/placeholder.svg?height=300&width=600&text=Tech+Summit",
        }

        const mockRegistrations: Registration[] = [
          {
            id: 1,
            studentName: "John Doe",
            studentEmail: "john.doe@university.edu",
            registrationDate: "March 15, 2024",
            paymentStatus: "paid",
            amount: 399,
          },
          {
            id: 2,
            studentName: "Sarah Wilson",
            studentEmail: "sarah.wilson@university.edu",
            registrationDate: "March 14, 2024",
            paymentStatus: "paid",
            amount: 399,
          },
          {
            id: 3,
            studentName: "Mike Johnson",
            studentEmail: "mike.johnson@university.edu",
            registrationDate: "March 13, 2024",
            paymentStatus: "pending",
            amount: 399,
          },
        ]

        const mockFeedback: Feedback[] = [
          {
            id: 1,
            studentName: "Alice Brown",
            rating: 5,
            comment: "Excellent event! Very informative and well organized.",
            submittedAt: "March 20, 2024",
          },
          {
            id: 2,
            studentName: "Bob Smith",
            rating: 4,
            comment: "Great speakers and content. Could use better networking time.",
            submittedAt: "March 19, 2024",
          },
        ]

        setEvent(mockEvent)
        setRegistrations(mockRegistrations)
        setFeedback(mockFeedback)
      } catch (error) {
        console.error("Error fetching event details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEventDetails()
  }, [params.id])

  const handleEditEvent = () => {
    window.location.href = `/admin/events/${params.id}/edit`
  }

  const handleExportRegistrations = () => {
    const csvContent = [
      ["Name", "Email", "Registration Date", "Payment Status", "Amount"].join(","),
      ...registrations.map((reg) =>
        [reg.studentName, reg.studentEmail, reg.registrationDate, reg.paymentStatus, reg.amount].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${event?.title}-registrations.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleSendEmail = (email: string) => {
    window.location.href = `mailto:${email}`
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>
      case "ongoing":
        return <Badge className="bg-green-100 text-green-800">Ongoing</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending</Badge>
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <AdminNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading event details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <AdminNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
            <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
            <Button onClick={() => (window.location.href = "/admin/events")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => (window.location.href = "/admin/events")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
              <p className="text-gray-600 text-lg">Event Details & Management</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEditEvent}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Event
            </Button>
            <Button variant="outline" onClick={handleExportRegistrations}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Event Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(event.status)}
                      <Badge className="bg-purple-100 text-purple-800">{event.category}</Badge>
                      {event.published && <Badge className="bg-green-100 text-green-800">Published</Badge>}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.image && (
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-5 h-5 mr-3" />
                      <div>
                        <p className="font-medium">{event.date}</p>
                        <p className="text-sm">{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-5 h-5 mr-3" />
                      <div>
                        <p className="font-medium">{event.venue}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-5 h-5 mr-3" />
                      <div>
                        <p className="font-medium">₹{event.price}</p>
                        <p className="text-sm">per ticket</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="w-5 h-5 mr-3" />
                      <div>
                        <p className="font-medium">{event.registrations} registered</p>
                        <p className="text-sm">of {event.maxParticipants} max</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Contact Information</h4>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendEmail(event.contactEmail)}
                        className="bg-transparent"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        {event.contactEmail}
                      </Button>
                      {event.contactPhone && (
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Phone className="w-4 h-4 mr-2" />
                          {event.contactPhone}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Registrations</span>
                  <span className="font-bold text-2xl">{event.registrations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="font-bold text-2xl text-green-600">₹{event.revenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Capacity Used</span>
                  <span className="font-bold text-2xl">
                    {Math.round((event.registrations / event.maxParticipants) * 100)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg Rating</span>
                  <span className="font-bold text-2xl">
                    {feedback.length > 0
                      ? (feedback.reduce((sum, f) => sum + f.rating, 0) / feedback.length).toFixed(1)
                      : "N/A"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent" onClick={handleEditEvent}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Event
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={handleExportRegistrations}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Registrations
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Eye className="w-4 h-4 mr-2" />
                  View Public Page
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Announcement
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="registrations" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="registrations">Registrations ({event.registrations})</TabsTrigger>
            <TabsTrigger value="feedback">Feedback ({feedback.length})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="registrations">
            <Card>
              <CardHeader>
                <CardTitle>Event Registrations</CardTitle>
                <CardDescription>List of all registered participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900">Student</th>
                        <th className="text-left p-4 font-medium text-gray-900">Registration Date</th>
                        <th className="text-left p-4 font-medium text-gray-900">Payment Status</th>
                        <th className="text-left p-4 font-medium text-gray-900">Amount</th>
                        <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((registration) => (
                        <tr key={registration.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{registration.studentName}</div>
                              <div className="text-sm text-gray-600">{registration.studentEmail}</div>
                            </div>
                          </td>
                          <td className="p-4 text-sm">{registration.registrationDate}</td>
                          <td className="p-4">{getPaymentStatusBadge(registration.paymentStatus)}</td>
                          <td className="p-4 font-medium">₹{registration.amount}</td>
                          <td className="p-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSendEmail(registration.studentEmail)}
                            >
                              <Mail className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Event Feedback</CardTitle>
                <CardDescription>Reviews and ratings from attendees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{item.studentName}</h4>
                          <div className="flex items-center mt-1">
                            {renderStars(item.rating)}
                            <span className="ml-2 text-sm text-gray-600">({item.rating}/5)</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{item.submittedAt}</span>
                      </div>
                      <p className="text-gray-700">{item.comment}</p>
                    </div>
                  ))}
                  {feedback.length === 0 && (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">No feedback received yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registration Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Registration chart would appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Revenue</span>
                      <span className="font-bold">₹{event.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average per Ticket</span>
                      <span className="font-bold">₹{event.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projected Revenue</span>
                      <span className="font-bold">₹{(event.maxParticipants * event.price).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenue Progress</span>
                      <span className="font-bold">
                        {Math.round((event.revenue / (event.maxParticipants * event.price)) * 100)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
