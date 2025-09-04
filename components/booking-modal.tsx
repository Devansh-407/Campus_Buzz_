"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useStore } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { EmailService } from "@/lib/email-service"
import { TicketData } from "@/lib/qr-service"
import { TicketVerificationService } from "@/lib/ticket-verification"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  CreditCard,
  Smartphone,
  Building,
  Check,
  Loader2,
  Ticket,
  Star,
  Heart,
  Share2,
} from "lucide-react"

interface BookingModalProps {
  event: any
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ event, isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [bookingData, setBookingData] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  })
  const [emailScheduleId, setEmailScheduleId] = useState<string | null>(null)

  const { user } = useAuth()
  const { addNotification, toggleFavorite, favorites } = useStore()
  const isFavorite = favorites.includes(event?.id)

  const handleBooking = async () => {
    setIsLoading(true)

    try {
      // Generate booking ID
      const bookingId = `BK${Date.now()}`
      
      // Create ticket data for QR generation
      const ticketData: TicketData = {
        bookingId,
        eventId: event.id.toString(),
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        userName: bookingData.name || user?.name || "",
        userEmail: bookingData.email || user?.email || "",
        userPhone: bookingData.phone || user?.phone || "",
        ticketQuantity,
        totalAmount: totalAmount + Math.round(totalAmount * 0.02),
        bookingTimestamp: new Date().toISOString()
      }

      // Store ticket data for verification
      TicketVerificationService.storeTicketData(ticketData)
      
      // Schedule QR code email for event date
      const scheduleId = EmailService.scheduleQREmail(ticketData)
      setEmailScheduleId(scheduleId)

      // Simulate booking process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      addNotification({
        title: "Booking Confirmed!",
        message: `Your ticket for ${event.title} has been confirmed. QR code will be sent on event day.`,
        type: "success",
        read: false,
      })

      setIsLoading(false)
      setStep(4) // Success step
    } catch (error) {
      console.error('Booking failed:', error)
      addNotification({
        title: "Booking Failed",
        message: "There was an error processing your booking. Please try again.",
        type: "error",
        read: false,
      })
      setIsLoading(false)
    }
  }

  const totalAmount = event?.price * ticketQuantity

  if (!event) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Book Ticket - {event.title}</span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleFavorite(event.id)}
                className={isFavorite ? "text-red-500" : "text-gray-500"}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            Complete your booking in {step === 4 ? "booking confirmed!" : `${4 - step + 1} steps`}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNumber ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step > stepNumber ? <Check className="w-4 h-4" /> : stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-16 h-1 mx-2 ${step > stepNumber ? "bg-orange-500" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Event Details */}
        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Event Details
                  <Badge className="bg-orange-100 text-orange-800">{event.category}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-orange-500" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                    {event.building}
                  </div>
                  <div className="flex items-center text-sm">
                    <Building className="w-4 h-4 mr-2 text-orange-500" />
                    {event.room}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {event.attendees}/{event.maxAttendees} attending
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {event.rating}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Select Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{event.ticketType || "Regular"} Ticket</div>
                    <div className="text-2xl font-bold text-green-600">₹{event.price}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{ticketQuantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTicketQuantity(Math.min(5, ticketQuantity + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Total Amount:</span>
                    <span className="text-xl font-bold text-green-600">₹{totalAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={() => setStep(2)} className="w-full bg-orange-500 hover:bg-orange-600">
              Continue to Details
            </Button>
          </div>
        )}

        {/* Step 2: Personal Details */}
        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>Please provide your contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={bookingData.name || user?.name || ""}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={bookingData.email || user?.email || ""}
                      onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={bookingData.phone || user?.phone || ""}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="requests">Special Requests (Optional)</Label>
                  <Textarea
                    id="requests"
                    value={bookingData.specialRequests}
                    onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                    placeholder="Any special requirements or dietary restrictions"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1 bg-orange-500 hover:bg-orange-600">
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "upi" ? "border-orange-500 bg-orange-50" : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Smartphone className="w-5 h-5 mr-3 text-orange-500" />
                        <div>
                          <div className="font-medium">UPI Payment</div>
                          <div className="text-sm text-gray-600">Pay using Google Pay, PhonePe, Paytm</div>
                        </div>
                      </div>
                      {paymentMethod === "upi" && <Check className="w-5 h-5 text-orange-500" />}
                    </div>
                  </div>

                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === "card" ? "border-orange-500 bg-orange-50" : "border-gray-200"
                    }`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-3 text-orange-500" />
                        <div>
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-gray-600">Visa, Mastercard, RuPay</div>
                        </div>
                      </div>
                      {paymentMethod === "card" && <Check className="w-5 h-5 text-orange-500" />}
                    </div>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-3 mt-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      {event.title} x {ticketQuantity}
                    </span>
                    <span>₹{totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Platform Fee</span>
                    <span>₹{Math.round(totalAmount * 0.02)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{totalAmount + Math.round(totalAmount * 0.02)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleBooking} disabled={isLoading} className="flex-1 bg-orange-500 hover:bg-orange-600">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Ticket className="w-4 h-4 mr-2" />
                    Confirm Booking
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h3>
              <p className="text-gray-600">
                Your ticket for <strong>{event.title}</strong> has been confirmed. 
                <br />
                <strong>🔒 Secure QR Code will be sent to your email on the event day.</strong>
              </p>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                <strong>Security Notice:</strong> Your QR code is uniquely linked to your email and cannot be transferred. 
                This prevents ticket fraud and ensures only you can use your ticket.
              </div>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Booking ID:</span>
                    <span className="font-mono">BK{Date.now()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Event:</span>
                    <span>{event.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tickets:</span>
                    <span>{ticketQuantity}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total Paid:</span>
                    <span>₹{totalAmount + Math.round(totalAmount * 0.02)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Close
              </Button>
              <Button
                onClick={() => (window.location.href = "/my-tickets")}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                View My Tickets
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
