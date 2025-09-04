"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AdminNavigation from "@/components/admin-navigation"
import { Search, Star, MessageSquare, Mail, MoreVertical, Eye, Reply, Archive, Flag } from "lucide-react"

export default function FeedbackPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [replyText, setReplyText] = useState("")
  const [selectedFeedback, setSelectedFeedback] = useState<number | null>(null)

  // Mock feedback data
  const feedbackData = [
    {
      id: 1,
      studentName: "John Doe",
      studentEmail: "john.doe@university.edu",
      eventName: "Annual Tech Summit 2024",
      rating: 5,
      feedback:
        "Excellent event! The speakers were knowledgeable and the networking opportunities were great. Would definitely attend again.",
      category: "positive",
      status: "new",
      submittedAt: "March 15, 2024, 2:30 PM",
      replied: false,
    },
    {
      id: 2,
      studentName: "Sarah Wilson",
      studentEmail: "sarah.wilson@university.edu",
      eventName: "Spring Music Festival",
      rating: 4,
      feedback:
        "Great music and atmosphere! However, the sound quality could have been better in some areas of the venue.",
      category: "mixed",
      status: "reviewed",
      submittedAt: "March 14, 2024, 8:45 PM",
      replied: true,
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      studentEmail: "mike.johnson@university.edu",
      eventName: "Art Exhibition",
      rating: 2,
      feedback:
        "The event was poorly organized. Long queues, limited seating, and some exhibits were not properly labeled.",
      category: "negative",
      status: "new",
      submittedAt: "March 13, 2024, 4:15 PM",
      replied: false,
    },
    {
      id: 4,
      studentName: "Emily Davis",
      studentEmail: "emily.davis@university.edu",
      eventName: "Winter Hackathon 2024",
      rating: 5,
      feedback:
        "Amazing hackathon! Well organized, great mentors, and exciting challenges. The prizes were also fantastic!",
      category: "positive",
      status: "resolved",
      submittedAt: "March 12, 2024, 11:20 AM",
      replied: true,
    },
  ]

  const statuses = ["all", "new", "reviewed", "resolved"]
  const categories = ["all", "positive", "mixed", "negative"]

  const filteredFeedback = feedbackData.filter((feedback) => {
    const matchesSearch =
      feedback.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.feedback.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === "all" || feedback.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800 text-xs">New</Badge>
      case "reviewed":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Reviewed</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 text-xs">Resolved</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {status}
          </Badge>
        )
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "positive":
        return <Badge className="bg-green-100 text-green-800 text-xs">Positive</Badge>
      case "mixed":
        return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Mixed</Badge>
      case "negative":
        return <Badge className="bg-red-100 text-red-800 text-xs">Negative</Badge>
      default:
        return (
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        )
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const handleReply = (feedbackId: number) => {
    if (replyText.trim()) {
      alert(`Reply sent to feedback ${feedbackId}: ${replyText}`)
      setReplyText("")
      setSelectedFeedback(null)
    }
  }

  const handleMarkAsReviewed = (feedbackId: number) => {
    alert(`Marked feedback ${feedbackId} as reviewed`)
  }

  const handleArchive = (feedbackId: number) => {
    alert(`Archived feedback ${feedbackId}`)
  }

  const handleFlag = (feedbackId: number) => {
    alert(`Flagged feedback ${feedbackId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback & Support</h1>
            <p className="text-gray-600 text-lg">View and respond to student feedback and complaints</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-gray-900">{feedbackData.length}</div>
              <p className="text-sm text-gray-600">Total Feedback</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">
                {feedbackData.filter((f) => f.status === "new").length}
              </div>
              <p className="text-sm text-gray-600">New Feedback</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">4.2</div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round((feedbackData.filter((f) => f.replied).length / feedbackData.length) * 100)}%
              </div>
              <p className="text-sm text-gray-600">Response Rate</p>
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
                    placeholder="Search feedback by student, event, or content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
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

        {/* Feedback List */}
        <div className="space-y-6">
          {filteredFeedback.map((feedback) => (
            <Card key={feedback.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 truncate">{feedback.studentName}</h3>
                      {getStatusBadge(feedback.status)}
                      {getCategoryBadge(feedback.category)}
                      {feedback.replied && <Badge className="bg-blue-100 text-blue-800 text-xs">Replied</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="truncate">{feedback.eventName}</span>
                      <div className="flex items-center">
                        {renderStars(feedback.rating)}
                        <span className="ml-1">({feedback.rating}/5)</span>
                      </div>
                      <span>{feedback.submittedAt}</span>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex-shrink-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedFeedback(feedback.id)}>
                        <Reply className="w-4 h-4 mr-2" />
                        Reply
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleMarkAsReviewed(feedback.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Mark as Reviewed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => (window.location.href = `mailto:${feedback.studentEmail}`)}>
                        <Mail className="w-4 h-4 mr-2" />
                        Email Student
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleFlag(feedback.id)}>
                        <Flag className="w-4 h-4 mr-2" />
                        Flag
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleArchive(feedback.id)}>
                        <Archive className="w-4 h-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{feedback.feedback}</p>

                  {selectedFeedback === feedback.id && (
                    <div className="border-t pt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Reply to {feedback.studentName}</h4>
                      <Textarea
                        placeholder="Type your reply here..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        rows={3}
                      />
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleReply(feedback.id)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <Reply className="w-4 h-4 mr-2" />
                          Send Reply
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setSelectedFeedback(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFeedback.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No feedback found</h3>
              <p className="text-gray-600">Try adjusting your search criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
