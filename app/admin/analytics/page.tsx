"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import AdminNavigation from "@/components/admin-navigation"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Download,
  RefreshCw,
  Eye,
  Star,
  Target,
  Activity,
  Zap,
  Award,
} from "lucide-react"

interface AnalyticsData {
  overview: {
    totalEvents: number
    totalStudents: number
    totalRevenue: number
    avgAttendance: number
    conversionRate: number
    customerSatisfaction: number
  }
  eventPerformance: Array<{
    name: string
    registrations: number
    revenue: number
    rating: number
    attendanceRate: number
    category: string
  }>
  trends: {
    registrations: number[]
    revenue: number[]
    events: number[]
    labels: string[]
  }
  demographics: {
    departments: Array<{ name: string; percentage: number; count: number }>
    years: Array<{ name: string; percentage: number; count: number }>
    categories: Array<{ name: string; percentage: number; events: number }>
  }
  insights: Array<{
    type: "positive" | "negative" | "neutral"
    title: string
    description: string
    metric: string
    change: number
  }>
}

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("registrations")

  // Mock analytics data
  const analyticsData: AnalyticsData = {
    overview: {
      totalEvents: 24,
      totalStudents: 1250,
      totalRevenue: 125000,
      avgAttendance: 85,
      conversionRate: 12.5,
      customerSatisfaction: 4.7,
    },
    eventPerformance: [
      {
        name: "Tech Summit",
        registrations: 245,
        revenue: 97755,
        rating: 4.8,
        attendanceRate: 92,
        category: "Technology",
      },
      {
        name: "Music Festival",
        registrations: 180,
        revenue: 53820,
        rating: 4.6,
        attendanceRate: 88,
        category: "Music",
      },
      {
        name: "Art Exhibition",
        registrations: 89,
        revenue: 13261,
        rating: 4.7,
        attendanceRate: 95,
        category: "Arts",
      },
      {
        name: "Hackathon",
        registrations: 200,
        revenue: 39800,
        rating: 4.9,
        attendanceRate: 87,
        category: "Technology",
      },
    ],
    trends: {
      registrations: [120, 135, 148, 162, 180, 195, 210],
      revenue: [25000, 28000, 32000, 35000, 38000, 42000, 45000],
      events: [2, 3, 2, 4, 3, 5, 4],
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    },
    demographics: {
      departments: [
        { name: "Computer Science", percentage: 35, count: 437 },
        { name: "Engineering", percentage: 28, count: 350 },
        { name: "Business", percentage: 20, count: 250 },
        { name: "Arts", percentage: 17, count: 213 },
      ],
      years: [
        { name: "1st Year", percentage: 25, count: 312 },
        { name: "2nd Year", percentage: 30, count: 375 },
        { name: "3rd Year", percentage: 28, count: 350 },
        { name: "4th Year", percentage: 17, count: 213 },
      ],
      categories: [
        { name: "Technology", percentage: 45, events: 11 },
        { name: "Music", percentage: 25, events: 6 },
        { name: "Arts", percentage: 20, events: 5 },
        { name: "Sports", percentage: 10, events: 2 },
      ],
    },
    insights: [
      {
        type: "positive",
        title: "Peak Performance Day",
        description: "Thursday shows the highest registration rate with excellent conversion",
        metric: "61 registrations",
        change: 23,
      },
      {
        type: "positive",
        title: "Top Audience Segment",
        description: "Computer Science students show strong engagement across all event types",
        metric: "35% participation",
        change: 12,
      },
      {
        type: "neutral",
        title: "Conversion Leader",
        description: "Technology events consistently achieve the highest conversion rates",
        metric: "9.1% conversion",
        change: 0,
      },
      {
        type: "negative",
        title: "Weekend Dip",
        description: "Weekend events show lower attendance rates compared to weekdays",
        metric: "68% attendance",
        change: -15,
      },
    ],
  }

  const handleExportAnalytics = () => {
    const csvContent = [
      ["Metric", "Value", "Period"].join(","),
      ["Total Events", analyticsData.overview.totalEvents, selectedPeriod],
      ["Total Students", analyticsData.overview.totalStudents, selectedPeriod],
      ["Total Revenue", analyticsData.overview.totalRevenue, selectedPeriod],
      ["Average Attendance", `${analyticsData.overview.avgAttendance}%`, selectedPeriod],
      ["Conversion Rate", `${analyticsData.overview.conversionRate}%`, selectedPeriod],
      ["Customer Satisfaction", analyticsData.overview.customerSatisfaction, selectedPeriod],
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-${selectedPeriod}-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleRefreshData = () => {
    alert("Refreshing analytics data...")
  }

  const handleViewEventDetails = (eventName: string) => {
    alert(`Viewing detailed analytics for ${eventName}`)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <TrendingUp className="w-5 h-5 text-green-600" />
      case "negative":
        return <TrendingDown className="w-5 h-5 text-red-600" />
      default:
        return <Activity className="w-5 h-5 text-blue-600" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "positive":
        return "bg-green-50 border-green-200"
      case "negative":
        return "bg-red-50 border-red-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600 text-lg">Comprehensive performance insights and trends</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" onClick={handleRefreshData} className="bg-transparent">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleExportAnalytics} className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalEvents}</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{analyticsData.overview.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.avgAttendance}%</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Zap className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
              <Award className="h-4 w-4 text-pink-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.customerSatisfaction}/5</div>
              <p className="text-xs text-muted-foreground">+0.3 from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Event Performance</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Key performance indicators at a glance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">Event Success Rate</span>
                      <span className="font-bold text-blue-800">94%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">Revenue Growth</span>
                      <span className="font-bold text-green-800">+18%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-purple-800">Student Engagement</span>
                      <span className="font-bold text-purple-800">87%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium text-orange-800">Repeat Attendance</span>
                      <span className="font-bold text-orange-800">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trends Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Trends Overview</CardTitle>
                  <CardDescription>Registration and revenue trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Interactive chart visualization</p>
                      <p className="text-sm text-gray-500">Showing {selectedPeriod} data trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Event Performance Analysis</CardTitle>
                  <CardDescription>Detailed performance metrics for each event</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleExportAnalytics()}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Event</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Registrations</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Revenue</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Rating</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Attendance</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Category</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.eventPerformance.map((event, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="font-medium text-gray-900">{event.name}</div>
                          </td>
                          <td className="p-4 text-sm">{event.registrations}</td>
                          <td className="p-4 text-sm font-medium text-green-600">₹{event.revenue.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex items-center">
                              {renderStars(Math.floor(event.rating))}
                              <span className="ml-2 text-sm text-gray-600">({event.rating})</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <span className="text-sm font-medium">{event.attendanceRate}%</span>
                              <div className="ml-2 w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${event.attendanceRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary" className="text-xs">
                              {event.category}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm" onClick={() => handleViewEventDetails(event.name)}>
                              <Eye className="w-4 h-4" />
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

          <TabsContent value="demographics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Department Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                  <CardDescription>Student participation by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.demographics.departments.map((dept, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{dept.name}</span>
                          <span className="text-sm text-gray-600">
                            {dept.percentage}% ({dept.count} students)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${dept.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Year Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Academic Year Distribution</CardTitle>
                  <CardDescription>Student participation by academic year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.demographics.years.map((year, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{year.name}</span>
                          <span className="text-sm text-gray-600">
                            {year.percentage}% ({year.count} students)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${year.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Event Categories */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Popular Event Categories</CardTitle>
                  <CardDescription>Most attended event categories and their performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {analyticsData.demographics.categories.map((category, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.events} events
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold text-blue-600 mb-1">{category.percentage}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Trends Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Registration Trends</CardTitle>
                  <CardDescription>Weekly registration patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      <p className="text-gray-600">Registration trend chart</p>
                      <p className="text-sm text-gray-500">7-week trend analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Weekly revenue patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Revenue trend chart</p>
                      <p className="text-sm text-gray-500">7-week trend analysis</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="space-y-4">
              {analyticsData.insights.map((insight, index) => (
                <Card key={index} className={`${getInsightColor(insight.type)} border-l-4`}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      {getInsightIcon(insight.type)}
                      <span>{insight.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                    <div className="text-sm font-medium text-gray-900 mt-2">
                      {insight.metric} ({insight.change > 0 ? `+${insight.change}` : insight.change}) 
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
