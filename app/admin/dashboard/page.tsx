"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import AuthGuard from "@/components/auth-guard"
import { Badge } from "@/components/ui/badge"
import AdminNavigation from "@/components/admin-navigation"
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Plus,
  FileText,
  Settings,
  Eye,
  Edit,
  Clock,
  AlertCircle,
} from "lucide-react"

export default function AdminDashboard() {
  // Mock data - in real app, this would come from API
  const dashboardStats = {
    totalEvents: 24,
    totalStudents: 1250,
    totalRevenue: 125000,
    upcomingEvents: 8,
    monthlyGrowth: {
      events: 15,
      students: 23,
      revenue: 18,
    },
  }

  const recentEvents = [
    {
      id: 1,
      title: "Annual Tech Summit 2024",
      date: "March 25, 2024",
      registrations: 245,
      revenue: 97755,
      status: "upcoming",
      category: "Technology",
    },
    {
      id: 2,
      title: "Spring Music Festival",
      date: "March 30, 2024",
      registrations: 180,
      revenue: 53820,
      status: "upcoming",
      category: "Music",
    },
    {
      id: 3,
      title: "Winter Hackathon 2024",
      date: "February 15, 2024",
      registrations: 200,
      revenue: 39800,
      status: "completed",
      category: "Technology",
    },
    {
      id: 4,
      title: "Art Exhibition",
      date: "February 28, 2024",
      registrations: 89,
      revenue: 13261,
      status: "completed",
      category: "Arts",
    },
  ]

  const quickActions = [
    {
      title: "Add New Event",
      description: "Create and publish a new campus event",
      icon: Plus,
      href: "/admin/events/create",
      color: "bg-green-500",
    },
    {
      title: "View Reports",
      description: "Generate and download event reports",
      icon: FileText,
      href: "/admin/reports",
      color: "bg-blue-500",
    },
    {
      title: "Manage Students",
      description: "View and manage student registrations",
      icon: Users,
      href: "/admin/students",
      color: "bg-purple-500",
    },
    {
      title: "Revenue Analytics",
      description: "Track payments and financial reports",
      icon: DollarSign,
      href: "/admin/revenue",
      color: "bg-orange-500",
    },
    {
      title: "Website Settings",
      description: "Manage homepage and site configuration",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-gray-500",
    },
    {
      title: "Feedback & Support",
      description: "View student feedback and complaints",
      icon: AlertCircle,
      href: "/admin/feedback",
      color: "bg-red-500",
    },
  ]

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

  const handleNavigation = (href: string) => {
    window.location.href = href
  }

  const handleViewEvent = (eventId: number) => {
    window.location.href = `/admin/events/${eventId}`
  }

  const handleEditEvent = (eventId: number) => {
    window.location.href = `/admin/events/${eventId}/edit`
  }

  return (
    <AuthGuard requiredRole="admin">
      <div className="min-h-screen bg-gray-50">
        <AdminNavigation />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 text-lg">Welcome back! Here's what's happening with your events.</p>
          </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{dashboardStats.monthlyGrowth.events}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Registered Students</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{dashboardStats.monthlyGrowth.students}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{dashboardStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+{dashboardStats.monthlyGrowth.revenue}%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.upcomingEvents}</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Events */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Events</CardTitle>
                  <CardDescription>Latest events and their performance</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleNavigation("/admin/events")}>
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 truncate">{event.title}</h3>
                          {getStatusBadge(event.status)}
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{event.date}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center">
                              <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                              <span className="text-sm">{event.registrations} registered</span>
                            </span>
                            <span className="font-medium text-green-600 text-sm">
                              ₹{event.revenue.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => handleEditEvent(event.id)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleViewEvent(event.id)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start h-auto p-4 hover:bg-gray-50 bg-transparent transition-colors"
                        onClick={() => handleNavigation(action.href)}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mr-3 flex-shrink-0`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left min-w-0 flex-1">
                          <div className="font-medium text-sm text-gray-900 truncate">{action.title}</div>
                          <div className="text-xs text-gray-500 line-clamp-2">{action.description}</div>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions and system updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">John Doe</span> registered for Annual Tech Summit 2024
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">Spring Music Festival</span> reached 180 registrations
                    </p>
                    <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      Payment of ₹399 received from <span className="font-medium">Sarah Wilson</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      New feedback received for <span className="font-medium">Winter Hackathon 2024</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </AuthGuard>
  )
}
