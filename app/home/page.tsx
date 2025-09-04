"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Navigation from "@/components/navigation"
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  Clock,
  Star,
  TrendingUp,
  Music,
  Code,
  Palette,
  Trophy,
  Camera,
  Gamepad2,
  ShoppingCart,
} from "lucide-react"
import BookingModal from "@/components/booking-modal"
import { useStore } from "@/lib/store"
import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api"

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const { toggleFavorite, favorites, addToCart, addNotification } = useStore()

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getEvents({ limit: 6 })
        setEvents(response)
      } catch (error) {
        console.error('Failed to fetch events:', error)
        // Fallback to sample data if API fails
        setEvents(sampleEvents)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const sampleEvents = [
    {
      id: 1,
      title: "Annual Tech Summit 2024",
      category: "Technology",
      date: "March 25, 2024",
      start_time: "10:00 AM",
      venue: "Engineering Block A, Auditorium",
      price: 299,
      image_url: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      attendees: 250,
      rating: 4.8,
      isPopular: true,
      description: "Join industry leaders and innovators for a day of cutting-edge technology discussions.",
    },
    {
      id: 2,
      title: "Spring Music Festival",
      category: "Music",
      date: "March 30, 2024",
      time: "6:00 PM",
      location: "Main Campus Ground",
      price: "199",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      attendees: 800,
      rating: 4.9,
      isPopular: true,
      description: "Experience amazing live performances from local and national artists.",
    },
    {
      id: 3,
      title: "Startup Pitch Competition",
      category: "Business",
      date: "April 5, 2024",
      time: "2:00 PM",
      location: "Business Block B, Hall 201",
      price: "149",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      attendees: 150,
      rating: 4.7,
      isPopular: false,
      description: "Watch innovative startup ideas compete for funding and mentorship.",
    },
  ]

  const pastEvents = [
    {
      id: 1,
      title: "Winter Hackathon 2024",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      attendees: 200,
      rating: 4.9,
    },
    {
      id: 2,
      title: "Cultural Night",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      attendees: 600,
      rating: 4.8,
    },
    {
      id: 3,
      title: "Sports Championship",
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      attendees: 400,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Art Exhibition",
      image: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      attendees: 180,
      rating: 4.6,
    },
  ]

  const categories = [
    { name: "Technology", icon: Code, count: 12, color: "bg-green-100 text-green-800" },
    { name: "Music", icon: Music, count: 8, color: "bg-purple-100 text-purple-800" },
    { name: "Arts", icon: Palette, count: 15, color: "bg-orange-100 text-orange-800" },
    { name: "Sports", icon: Trophy, count: 10, color: "bg-red-100 text-red-800" },
    { name: "Photography", icon: Camera, count: 6, color: "bg-blue-100 text-blue-800" },
    { name: "Gaming", icon: Gamepad2, count: 9, color: "bg-indigo-100 text-indigo-800" },
  ]

  const stats = [
    { label: "Total Events", value: "150+", icon: Calendar },
    { label: "Happy Students", value: "5,000+", icon: Users },
    { label: "Tickets Sold", value: "12,000+", icon: Ticket },
    { label: "Success Rate", value: "98%", icon: TrendingUp },
  ]

  return (
    <AuthGuard requiredRole="student">
      <div className="min-h-screen bg-gray-50">
        <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Campus Buzz! 🎉</h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Discover amazing events happening around your campus
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/events">
                <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                  <Calendar className="w-5 h-5 mr-2" />
                  Browse Events
                </Button>
              </Link>
              <Link href="/my-tickets">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-500 bg-transparent"
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  My Tickets
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these amazing upcoming events happening on campus
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(events.length > 0 ? events : sampleEvents).slice(0, 6).map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative">
                  <Image
                    src={event.image_url || event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-white text-gray-800">{event.category}</Badge>
                    {event.isPopular && (
                      <Badge className="bg-red-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white rounded-lg px-3 py-1 text-2xl font-bold text-green-600">₹{event.price}</div>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.venue || event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{event.start_time || event.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.attendees || event.max_participants || 0} attending
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {event.rating || 4.5}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                      onClick={() => {
                        addToCart({
                          eventId: event.id,
                          title: event.title,
                          price: typeof event.price === 'number' ? event.price : parseInt(event.price) || 0,
                          date: event.date,
                          time: event.start_time || event.time,
                          location: event.venue || event.location,
                          building: (event.venue || event.location)?.split(",")[0] || "Campus",
                          room: (event.venue || event.location)?.split(",")[1] || "Main Hall",
                          category: event.category,
                          image: event.image_url || event.image,
                          organizer: "Event Committee",
                          quantity: 1,
                          maxAttendees: event.max_participants || 500,
                          attendees: event.attendees || 0,
                        })
                        addNotification({
                          title: "Added to Cart! 🛒",
                          message: `${event.title} has been added to your cart.`,
                          type: "success",
                          read: false,
                        })
                      }}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedEvent(event)
                        setIsBookingModalOpen(true)
                      }}
                    >
                      Buy Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/events">
              <Button
                size="lg"
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                View All Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore events by category and find what interests you most
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <Link key={category.name} href={`/events?category=${category.name.toLowerCase()}`}>
                  <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-2">
                      <IconComponent className="w-12 h-12 mx-auto text-gray-700 group-hover:text-orange-500 transition-colors mb-2" />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <Badge className={category.color}>{category.count} events</Badge>
                    </CardHeader>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Past Events Gallery</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Take a look at the amazing events we've hosted and the memories we've created
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="font-semibold mb-1">{event.title}</h3>
                      <div className="flex items-center justify-center text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        {event.attendees}
                      </div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm truncate">{event.title}</h3>
                    <div className="flex items-center text-xs text-gray-600">
                      <Star className="w-3 h-3 mr-1 text-yellow-500" />
                      {event.rating}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join the Fun?</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Don't miss out on amazing campus events. Book your tickets now and be part of the Campus Buzz community!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/events">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                <Calendar className="w-5 h-5 mr-2" />
                Explore Events
              </Button>
            </Link>
            <Link href="/my-tickets">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-500 bg-transparent"
              >
                <Ticket className="w-5 h-5 mr-2" />
                View My Tickets
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <BookingModal
        event={selectedEvent}
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false)
          setSelectedEvent(null)
        }}
      />
      </div>
    </AuthGuard>
  )
}
