"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/navigation"
import { useStore } from "@/lib/store"
import {
  Calendar,
  Download,
  Share2,
  QrCode,
  Star,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
  Ticket,
  Users,
  Phone,
  Mail,
  Copy,
  Send,
  MessageSquare,
  Printer,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react"

export default function MyTicketsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showShareModal, setShowShareModal] = useState(false)

  const { tickets, addNotification, updateTicketRating } = useStore()

  const upcomingTickets = tickets.filter((ticket) => ticket.status === "confirmed")
  const pastTickets = tickets.filter((ticket) => ticket.status === "completed")
  const cancelledTickets = tickets.filter((ticket) => ticket.status === "cancelled")

  const handleDownloadTicket = (ticket: any) => {
    // Create a simple ticket content
    const ticketContent = `
CAMPUS BUZZ - EVENT TICKET
========================

Event: ${ticket.title}
Date: ${ticket.date}
Time: ${ticket.time}
Venue: ${ticket.building}, ${ticket.room}
Seat: ${ticket.seatNumber}
Order: ${ticket.orderNumber}
Price: ₹${ticket.price}

Present this ticket at the venue for entry.
    `

    const blob = new Blob([ticketContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ticket-${ticket.orderNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    addNotification({
      title: "Ticket Downloaded! 📄",
      message: `Your ticket for ${ticket.title} has been downloaded.`,
      type: "success",
      read: false,
    })
  }

  const handleShareTicket = (ticket: any) => {
    setSelectedTicket(ticket)
    setShowShareModal(true)
  }

  const handleCopyTicketLink = () => {
    const ticketUrl = `${window.location.origin}/ticket/${selectedTicket?.id}`
    navigator.clipboard.writeText(ticketUrl)

    addNotification({
      title: "Link Copied! 🔗",
      message: "Ticket link has been copied to clipboard.",
      type: "success",
      read: false,
    })
  }


  const handleRateEvent = (ticket: any) => {
    setSelectedTicket(ticket)
    setRating(ticket.rating || 0)
    setFeedback(ticket.feedback || "")
    setShowRatingModal(true)
  }

  const submitRating = () => {
    if (selectedTicket && rating > 0) {
      updateTicketRating(selectedTicket.id, rating, feedback)
      addNotification({
        title: "Rating Submitted! ⭐",
        message: `Thank you for rating ${selectedTicket.title}!`,
        type: "success",
        read: false,
      })
      setShowRatingModal(false)
      setRating(0)
      setFeedback("")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Unknown
          </Badge>
        )
    }
  }

  const TicketCard = ({ ticket }: { ticket: any }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Event Image */}
        <div className="md:w-1/3 relative">
          <Image
            src={ticket.image || "/placeholder.svg"}
            alt={ticket.title}
            width={300}
            height={200}
            className="w-full h-48 md:h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-white text-gray-800 capitalize">{ticket.category}</Badge>
          </div>
          <div className="absolute top-4 right-4">{getStatusBadge(ticket.status)}</div>
        </div>

        {/* Ticket Details */}
        <div className="md:w-2/3 flex flex-col">
          <CardHeader className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{ticket.title}</CardTitle>
                <CardDescription className="mb-3">{ticket.description}</CardDescription>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Organized by:</span> {ticket.organizer}
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-green-600">₹{ticket.price}</div>
                <div className="text-xs text-gray-500">Ticket ID: {ticket.id}</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                  {ticket.date}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-orange-500" />
                  {ticket.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                  <div>
                    <div>{ticket.building}</div>
                    <div className="text-xs text-gray-500">{ticket.room}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Ticket className="w-4 h-4 mr-2 text-orange-500" />
                  Seat: {ticket.seatNumber}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-orange-500" />
                  Type: {ticket.ticketType}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Order:</span> {ticket.orderNumber}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-1 text-orange-500" />
                {ticket.organizerContact}
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-1 text-orange-500" />
                {ticket.organizerEmail}
              </div>
            </div>

            {/* Special Status Messages */}
            {ticket.status === "cancelled" && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center text-red-800 mb-1">
                  <XCircle className="w-4 h-4 mr-2" />
                  <span className="font-medium">Event Cancelled</span>
                </div>
                <p className="text-sm text-red-700 mb-2">{ticket.cancellationReason}</p>
                {ticket.refundStatus === "processed" && (
                  <p className="text-sm text-green-700">✓ Refund of ₹{ticket.refundAmount} has been processed</p>
                )}
              </div>
            )}

            {/* Rating for completed events */}
            {ticket.status === "completed" && ticket.rating && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  <span className="font-medium text-blue-800">Your Rating: {ticket.rating}/5</span>
                </div>
                {ticket.feedback && <p className="text-sm text-blue-700">"{ticket.feedback}"</p>}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              {ticket.status === "confirmed" && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded px-3 py-2 text-sm text-blue-800">
                    🔒 QR code will be sent to your email on event day
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleDownloadTicket(ticket)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleShareTicket(ticket)}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </>
              )}

              {ticket.status === "completed" && (
                <>
                  <Button size="sm" variant="outline" onClick={() => handleDownloadTicket(ticket)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleRateEvent(ticket)}>
                    <Star className="w-4 h-4 mr-2" />
                    {ticket.rating ? "Update Rating" : "Rate Event"}
                  </Button>
                </>
              )}

              {ticket.status === "cancelled" && (
                <Button size="sm" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refund Status
                </Button>
              )}
            </div>

            {/* Transfer/Refund Options */}
            {ticket.status === "confirmed" && (
              <div className="flex gap-4 text-xs text-gray-500 pt-2 border-t">
                {ticket.transferable && <span>✓ Transferable</span>}
                {ticket.refundable && <span>✓ Refundable until 24hrs before event</span>}
                <span>Payment: {ticket.paymentMethod}</span>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  )

  const EmptyState = ({ type }: { type: string }) => (
    <div className="text-center py-12">
      <Ticket className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">No {type} tickets</h3>
      <p className="text-gray-600 mb-4">
        {type === "upcoming"
          ? "You don't have any upcoming events. Browse events to book tickets!"
          : type === "past"
            ? "You haven't attended any events yet."
            : "You don't have any cancelled tickets."}
      </p>
      {type === "upcoming" && (
        <Button
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
          onClick={() => (window.location.href = "/events")}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Browse Events
        </Button>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tickets</h1>
              <p className="text-gray-600">Manage your event tickets and bookings</p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{upcomingTickets.length}</div>
                <div className="text-sm text-gray-600">Upcoming</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{pastTickets.length}</div>
                <div className="text-sm text-gray-600">Attended</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  ₹{tickets.reduce((sum, ticket) => sum + ticket.price * ticket.quantity, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Upcoming ({upcomingTickets.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Past Events ({pastTickets.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              Cancelled ({cancelledTickets.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingTickets.length > 0 ? (
              upcomingTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
            ) : (
              <EmptyState type="upcoming" />
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastTickets.length > 0 ? (
              pastTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
            ) : (
              <EmptyState type="past" />
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-6">
            {cancelledTickets.length > 0 ? (
              cancelledTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
            ) : (
              <EmptyState type="cancelled" />
            )}
          </TabsContent>
        </Tabs>
      </div>


      {/* Rating Modal */}
      <Dialog open={showRatingModal} onOpenChange={setShowRatingModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Rate Event</DialogTitle>
            <DialogDescription>How was your experience at {selectedTicket?.title}?</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Rating</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-1 ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="feedback">Feedback (Optional)</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts about the event..."
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowRatingModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={submitRating} disabled={rating === 0} className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Submit Rating
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Modal */}
      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Ticket</DialogTitle>
            <DialogDescription>Share your ticket with friends or on social media</DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">{selectedTicket.title}</h3>
                <p className="text-sm text-gray-600">
                  {selectedTicket.date} • {selectedTicket.time}
                </p>
                <p className="text-sm text-gray-600">{selectedTicket.building}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleCopyTicketLink} className="flex-1 bg-transparent">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  <Send className="w-4 h-4 mr-2" />
                  Share via WhatsApp
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Help Section */}
      <section className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">Having issues with your tickets? Our support team is here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call Support
              </Button>
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </Button>
              <Button variant="outline">
                <ExternalLink className="w-4 h-4 mr-2" />
                Help Center
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
