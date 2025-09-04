"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Navigation from "@/components/navigation"
import { useStore } from "@/lib/store"
import {
  Calendar,
  MapPin,
  Clock,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  ArrowRight,
  Tag,
  Percent,
  Gift,
  Star,
  Users,
  Sparkles,
  Shield,
} from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, clearCart, addNotification, addTicket } = useStore()
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const promoCodes = {
    STUDENT10: 10,
    FIRST20: 20,
    CAMPUS15: 15,
    WELCOME25: 25,
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const platformFee = Math.round(subtotal * 0.02)
  const discount = appliedPromo ? Math.round(subtotal * (appliedPromo.discount / 100)) : 0
  const total = subtotal + platformFee - discount

  const applyPromoCode = () => {
    const upperCode = promoCode.toUpperCase()
    if (promoCodes[upperCode as keyof typeof promoCodes]) {
      setAppliedPromo({
        code: upperCode,
        discount: promoCodes[upperCode as keyof typeof promoCodes],
      })
      addNotification({
        title: "Promo Code Applied! 🎉",
        message: `You saved ₹${Math.round(subtotal * (promoCodes[upperCode as keyof typeof promoCodes] / 100))} with code ${upperCode}`,
        type: "success",
        read: false,
      })
    } else {
      addNotification({
        title: "Invalid Promo Code",
        message: "Please check your promo code and try again.",
        type: "error",
        read: false,
      })
    }
  }

  const handleCheckout = async () => {
    setIsCheckingOut(true)

    // Simulate checkout process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Add tickets to user's collection
    cart.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        const ticket = {
          id: `TKT${Date.now()}${i}`,
          eventId: item.eventId,
          title: item.title,
          category: item.category,
          date: item.date,
          time: item.time,
          location: item.location,
          building: item.building,
          room: item.room,
          price: item.price,
          purchaseDate: new Date().toLocaleDateString(),
          status: "confirmed" as const,
          image: item.image,
          organizer: item.organizer,
          organizerContact: "+91 98765 43210",
          organizerEmail: "events@college.edu",
          qrCode: `data:image/svg+xml;base64,${btoa(`<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#000"/><rect x="10" y="10" width="80" height="80" fill="#fff"/><rect x="20" y="20" width="60" height="60" fill="#000"/></svg>`)}`,
          seatNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 100) + 1}`,
          ticketType: "Regular",
          orderNumber: `ORD${Date.now()}`,
          paymentMethod: "UPI",
          refundable: true,
          transferable: true,
          description: `Ticket for ${item.title}`,
          quantity: 1,
        }
        addTicket(ticket)
      }
    })

    clearCart()
    addNotification({
      title: "Order Confirmed! 🎊",
      message: `Your tickets have been booked successfully. Check your email for details.`,
      type: "success",
      read: false,
    })

    setIsCheckingOut(false)
    window.location.href = "/my-tickets"
  }

  const recommendedEvents = [
    {
      id: 101,
      title: "Photography Workshop",
      price: 149,
      image: "/placeholder.svg?height=150&width=200&text=Photography",
      category: "Arts",
      rating: 4.7,
    },
    {
      id: 102,
      title: "Startup Pitch Competition",
      price: 99,
      image: "/placeholder.svg?height=150&width=200&text=Startup+Pitch",
      category: "Business",
      rating: 4.5,
    },
    {
      id: 103,
      title: "Dance Battle Championship",
      price: 199,
      image: "/placeholder.svg?height=150&width=200&text=Dance+Battle",
      category: "Arts",
      rating: 4.8,
    },
  ]

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <Navigation />

        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <ShoppingCart className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any events to your cart yet. Discover amazing events happening on campus!
            </p>
            <Button
              onClick={() => (window.location.href = "/events")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-200"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Browse Events
            </Button>
          </div>

          {/* Recommended Events */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-8">Popular Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {recommendedEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={200}
                      height={150}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-white text-gray-800">{event.category}</Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{event.rating}</span>
                      </div>
                      <div className="text-lg font-bold text-green-600">₹{event.price}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <ShoppingCart className="w-8 h-8 mr-3 text-orange-500" />
              Shopping Cart
            </h1>
            <p className="text-gray-600 mt-2">
              {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.eventId} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={300}
                      height={200}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-white text-gray-800">{item.category}</Badge>
                  </div>

                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                            {item.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-orange-500" />
                            {item.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                            {item.building}, {item.room}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-orange-500" />
                            {item.attendees}/{item.maxAttendees} attending
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.eventId)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartQuantity(item.eventId, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateCartQuantity(item.eventId, Math.min(5, item.quantity + 1))}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">₹{item.price * item.quantity}</div>
                        <div className="text-sm text-gray-500">₹{item.price} each</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-orange-500" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Promo Code</label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={applyPromoCode}
                      disabled={!promoCode}
                      className="px-4 bg-transparent"
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="flex items-center text-green-600 text-sm">
                      <Gift className="w-4 h-4 mr-1" />
                      {appliedPromo.code} applied ({appliedPromo.discount}% off)
                    </div>
                  )}
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} tickets)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Platform Fee</span>
                    <span>₹{platformFee}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="flex items-center">
                        <Percent className="w-4 h-4 mr-1" />
                        Discount
                      </span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₹{total}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-1" />
                  Secure checkout with 256-bit SSL encryption
                </div>
              </CardContent>
            </Card>

            {/* Recommended Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">You might also like</CardTitle>
                <CardDescription>Popular events among students</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-500 mr-1" />
                          <span className="text-xs text-gray-600">{event.rating}</span>
                        </div>
                        <span className="text-sm font-bold text-green-600">₹{event.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
