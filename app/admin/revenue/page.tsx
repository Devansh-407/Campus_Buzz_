"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import AdminNavigation from "@/components/admin-navigation"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  CreditCard,
  RefreshCw,
  Search,
  Eye,
  FileText,
  BarChart3,
  PieChart,
  Smartphone,
} from "lucide-react"

interface RevenueData {
  totalRevenue: number
  monthlyRevenue: number
  weeklyRevenue: number
  dailyRevenue: number
  growth: {
    monthly: number
    weekly: number
    daily: number
  }
}

interface EventRevenue {
  id: number
  eventName: string
  revenue: number
  registrations: number
  avgTicketPrice: number
  date: string
  status: string
  category: string
}

interface PaymentMethod {
  method: string
  amount: number
  percentage: number
  transactions: number
  avgTransactionValue: number
}

interface Transaction {
  id: number
  studentName: string
  eventName: string
  amount: number
  method: string
  status: string
  date: string
  transactionId: string
}

export default function RevenuePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  // Mock revenue data
  const revenueStats: RevenueData = {
    totalRevenue: 125000,
    monthlyRevenue: 45000,
    weeklyRevenue: 12000,
    dailyRevenue: 2500,
    growth: {
      monthly: 18,
      weekly: 12,
      daily: -5,
    },
  }

  const eventRevenue: EventRevenue[] = [
    {
      id: 1,
      eventName: "Annual Tech Summit 2024",
      revenue: 97755,
      registrations: 245,
      avgTicketPrice: 399,
      date: "March 25, 2024",
      status: "upcoming",
      category: "Technology",
    },
    {
      id: 2,
      eventName: "Spring Music Festival",
      revenue: 53820,
      registrations: 180,
      avgTicketPrice: 299,
      date: "March 30, 2024",
      status: "upcoming",
      category: "Music",
    },
    {
      id: 3,
      eventName: "Winter Hackathon 2024",
      revenue: 39800,
      registrations: 200,
      avgTicketPrice: 199,
      date: "February 15, 2024",
      status: "completed",
      category: "Technology",
    },
    {
      id: 4,
      eventName: "Art Exhibition",
      revenue: 13261,
      registrations: 89,
      avgTicketPrice: 149,
      date: "February 28, 2024",
      status: "completed",
      category: "Arts",
    },
  ]

  const paymentMethods: PaymentMethod[] = [
    {
      method: "UPI",
      amount: 75000,
      percentage: 60,
      transactions: 450,
      avgTransactionValue: 167,
    },
    {
      method: "Credit Card",
      amount: 31250,
      percentage: 25,
      transactions: 180,
      avgTransactionValue: 174,
    },
    {
      method: "Debit Card",
      amount: 12500,
      percentage: 10,
      transactions: 85,
      avgTransactionValue: 147,
    },
    {
      method: "Net Banking",
      amount: 6250,
      percentage: 5,
      transactions: 35,
      avgTransactionValue: 179,
    },
  ]

  const recentTransactions: Transaction[] = [
    {
      id: 1,
      studentName: "John Doe",
      eventName: "Annual Tech Summit 2024",
      amount: 399,
      method: "UPI",
      status: "completed",
      date: "March 15, 2024",
      transactionId: "TXN001234567",
    },
    {
      id: 2,
      studentName: "Sarah Wilson",
      eventName: "Spring Music Festival",
      amount: 299,
      method: "Credit Card",
      status: "completed",
      date: "March 14, 2024",
      transactionId: "TXN001234568",
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      eventName: "Art Exhibition",
      amount: 149,
      method: "UPI",
      status: "pending",
      date: "March 13, 2024",
      transactionId: "TXN001234569",
    },
    {
      id: 4,
      studentName: "Emily Davis",
      eventName: "Winter Hackathon 2024",
      amount: 199,
      method: "Debit Card",
      status: "failed",
      date: "March 12, 2024",
      transactionId: "TXN001234570",
    },
  ]

  const monthlyData = [
    { month: "Jan", revenue: 35000, events: 8, transactions: 180 },
    { month: "Feb", revenue: 42000, events: 10, transactions: 220 },
    { month: "Mar", revenue: 48000, events: 12, transactions: 280 },
  ]

  const filteredTransactions = recentTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesPaymentMethod = selectedPaymentMethod === "all" || transaction.method === selectedPaymentMethod

    return matchesSearch && matchesPaymentMethod
  })

  const handleExportRevenue = (type: string) => {
    let csvContent = ""
    let filename = ""

    switch (type) {
      case "events":
        csvContent = [
          ["Event Name", "Revenue", "Registrations", "Avg Ticket Price", "Date", "Status", "Category"].join(","),
          ...eventRevenue.map((event) =>
            [
              event.eventName,
              event.revenue,
              event.registrations,
              event.avgTicketPrice,
              event.date,
              event.status,
              event.category,
            ].join(","),
          ),
        ].join("\n")
        filename = "event-revenue-report.csv"
        break

      case "payments":
        csvContent = [
          ["Payment Method", "Amount", "Percentage", "Transactions", "Avg Transaction Value"].join(","),
          ...paymentMethods.map((method) =>
            [method.method, method.amount, method.percentage, method.transactions, method.avgTransactionValue].join(
              ",",
            ),
          ),
        ].join("\n")
        filename = "payment-methods-report.csv"
        break

      case "transactions":
        csvContent = [
          ["Student Name", "Event Name", "Amount", "Method", "Status", "Date", "Transaction ID"].join(","),
          ...filteredTransactions.map((txn) =>
            [txn.studentName, txn.eventName, txn.amount, txn.method, txn.status, txn.date, txn.transactionId].join(","),
          ),
        ].join("\n")
        filename = "transactions-report.csv"
        break

      default:
        csvContent = [
          ["Period", "Total Revenue", "Monthly Revenue", "Weekly Revenue", "Daily Revenue"].join(","),
          [
            selectedPeriod,
            revenueStats.totalRevenue,
            revenueStats.monthlyRevenue,
            revenueStats.weeklyRevenue,
            revenueStats.dailyRevenue,
          ].join(","),
        ].join("\n")
        filename = "revenue-summary.csv"
    }

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleRefreshData = () => {
    alert("Refreshing revenue data...")
  }

  const handleViewEventDetails = (eventId: number) => {
    window.location.href = `/admin/events/${eventId}`
  }

  const handleViewTransaction = (transactionId: string) => {
    alert(`Viewing transaction details for ${transactionId}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 text-xs">Completed</Badge>
      case "ongoing":
        return <Badge className="bg-green-100 text-green-800 text-xs">Ongoing</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const getTransactionStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 text-xs">Completed</Badge>
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

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "UPI":
        return <Smartphone className="w-5 h-5 text-green-600" />
      case "Credit Card":
      case "Debit Card":
        return <CreditCard className="w-5 h-5 text-blue-600" />
      default:
        return <DollarSign className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Revenue Analytics</h1>
            <p className="text-gray-600 text-lg">Track payments and financial performance</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button variant="outline" onClick={handleRefreshData} className="bg-transparent">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" onClick={() => handleExportRevenue("summary")} className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{revenueStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time earnings</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{revenueStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />+{revenueStats.growth.monthly}%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Revenue</CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{revenueStats.weeklyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />+{revenueStats.growth.weekly}%
                </span>
                from last week
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Revenue</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{revenueStats.dailyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  {revenueStats.growth.daily}%
                </span>
                from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Analytics Tabs */}
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">By Events</TabsTrigger>
            <TabsTrigger value="payments">Payment Methods</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Trends */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Monthly Trends
                    </CardTitle>
                    <CardDescription>Revenue and transaction trends over time</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleExportRevenue("trends")}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-medium flex-shrink-0">
                            {data.month}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900">₹{data.revenue.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">
                              {data.events} events • {data.transactions} transactions
                            </div>
                          </div>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-2 flex-shrink-0">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(data.revenue / 50000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2" />
                    Revenue Breakdown
                  </CardTitle>
                  <CardDescription>Revenue distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-blue-800">Technology Events</span>
                      <span className="font-bold text-blue-800">₹137,555 (68%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">Music Events</span>
                      <span className="font-bold text-green-800">₹53,820 (27%)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-purple-800">Arts Events</span>
                      <span className="font-bold text-purple-800">₹13,261 (5%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Revenue by Event</CardTitle>
                  <CardDescription>Performance breakdown by individual events</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleExportRevenue("events")}>
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
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Revenue</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Registrations</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Avg Price</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Date</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventRevenue.map((event) => (
                        <tr key={event.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="min-w-0">
                              <div className="font-medium text-gray-900 truncate">{event.eventName}</div>
                              <div className="text-sm text-gray-600">{event.category}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium text-green-600">₹{event.revenue.toLocaleString()}</div>
                          </td>
                          <td className="p-4 text-sm">{event.registrations}</td>
                          <td className="p-4 text-sm">₹{event.avgTicketPrice}</td>
                          <td className="p-4 text-sm text-gray-600">{event.date}</td>
                          <td className="p-4">{getStatusBadge(event.status)}</td>
                          <td className="p-4">
                            <Button variant="ghost" size="sm" onClick={() => handleViewEventDetails(event.id)}>
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

          <TabsContent value="payments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Methods */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Methods
                    </CardTitle>
                    <CardDescription>Revenue breakdown by payment type</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleExportRevenue("payments")}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          {getPaymentMethodIcon(method.method)}
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900">{method.method}</div>
                            <div className="text-sm text-gray-600">{method.transactions} transactions</div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-medium text-gray-900">₹{method.amount.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{method.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Analytics</CardTitle>
                  <CardDescription>Detailed payment statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-gray-600">Success Rate</span>
                      <span className="font-bold text-green-600">96.8%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-gray-600">Avg Transaction Value</span>
                      <span className="font-bold text-blue-600">₹{Math.round(revenueStats.totalRevenue / 750)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-sm text-gray-600">Total Transactions</span>
                      <span className="font-bold text-orange-600">750</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm text-gray-600">Failed Transactions</span>
                      <span className="font-bold text-purple-600">24 (3.2%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest payment transactions</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExportRevenue("transactions")}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={selectedPaymentMethod}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      <option value="all">All Methods</option>
                      <option value="UPI">UPI</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="Net Banking">Net Banking</option>
                    </select>
                  </div>
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Student</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Event</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Amount</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Method</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Date</th>
                        <th className="text-left p-4 font-medium text-gray-900 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b hover:bg-gray-50 transition-colors">
                          <td className="p-4">
                            <div className="font-medium text-gray-900">{transaction.studentName}</div>
                          </td>
                          <td className="p-4">
                            <div className="text-sm text-gray-900 truncate max-w-xs">{transaction.eventName}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-medium">₹{transaction.amount}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {getPaymentMethodIcon(transaction.method)}
                              <span className="text-sm">{transaction.method}</span>
                            </div>
                          </td>
                          <td className="p-4">{getTransactionStatusBadge(transaction.status)}</td>
                          <td className="p-4 text-sm text-gray-600">{transaction.date}</td>
                          <td className="p-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewTransaction(transaction.transactionId)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredTransactions.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No transactions found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
