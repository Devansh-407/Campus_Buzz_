"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import AuthGuard from "@/components/auth-guard"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/navigation"
import BookingModal from "@/components/booking-modal"
import { useStore } from "@/lib/store"
import { apiClient } from "@/lib/api"
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  Users,
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Zap,
  Music,
  Palette,
  Trophy,
  Camera,
  Gamepad2,
  BookOpen,
  Check,
} from "lucide-react"

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPriceRange, setSelectedPriceRange] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const { addToCart, cart, toggleFavorite, favorites, addNotification } = useStore()

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getEvents()
        // Map API response to match expected format
        const mappedEvents = response.map((event: any) => ({
          ...event,
          image: event.image_url || "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
          time: `${event.start_time} - ${event.end_time}`,
          location: event.venue,
          building: event.venue.split(',')[0] || event.venue,
          room: event.venue.split(',')[1] || '',
          originalPrice: event.price,
          attendees: 0, // Default since not provided by API
          maxAttendees: event.max_participants,
          rating: 4.5, // Default rating
          tags: event.tags || [],
          featured: event.featured_event || false,
          popular: false, // Default
          organizer: "Event Organizer" // Default
        }))
        setEvents(mappedEvents)
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
      description:
        "Join industry leaders and innovators for a day of cutting-edge technology discussions, workshops, and networking opportunities.",
      category: "Technology",
      date: "March 25, 2024",
      time: "10:00 AM - 6:00 PM",
      location: "Engineering Block A, Main Auditorium",
      building: "Engineering Block A",
      room: "Main Auditorium",
      price: 399,
      originalPrice: 499,
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      organizer: "Tech Club",
      attendees: 245,
      maxAttendees: 300,
      rating: 4.8,
      tags: ["technology", "innovation", "networking", "workshops"],
      featured: true,
      popular: true,
    },
    {
      id: 2,
      title: "Spring Music Festival",
      description:
        "Experience amazing live performances from local and national artists in an outdoor concert setting.",
      category: "Music",
      date: "March 30, 2024",
      time: "6:00 PM - 11:00 PM",
      location: "Main Campus Ground, Open Air Stage",
      building: "Main Campus",
      room: "Open Air Stage",
      price: 299,
      originalPrice: 299,
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      organizer: "Cultural Committee",
      attendees: 180,
      maxAttendees: 500,
      rating: 4.6,
      tags: ["music", "concert", "outdoor", "festival"],
      featured: true,
    },
    {
      id: 3,
      title: "Art Exhibition & Workshop",
      description: "Showcase of student artwork followed by hands-on painting and sculpture workshops.",
      category: "Arts",
      date: "April 5, 2024",
      time: "2:00 PM - 8:00 PM",
      location: "Arts Building, Gallery Hall",
      building: "Arts Building",
      room: "Gallery Hall",
      price: 149,
      originalPrice: 199,
      image: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      organizer: "Arts Society",
      attendees: 89,
      maxAttendees: 150,
      rating: 4.7,
      tags: ["art", "exhibition", "workshop", "creative"],
      popular: true,
    },
    {
      id: 4,
      title: "Gaming Championship 2024",
      description: "Compete in various gaming tournaments including PUBG, FIFA, and CS:GO with amazing prizes.",
      category: "Gaming",
      date: "April 12, 2024",
      time: "9:00 AM - 9:00 PM",
      location: "Computer Science Block, Gaming Lab",
      building: "Computer Science Block",
      room: "Gaming Lab",
      price: 99,
      originalPrice: 99,
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      organizer: "Gaming Club",
      attendees: 156,
      maxAttendees: 200,
      rating: 4.5,
      tags: ["gaming", "tournament", "esports", "competition"],
    },
    {
      id: 5,
      title: "Photography Workshop",
      description: "Learn professional photography techniques and editing skills from industry experts.",
      category: "Photography",
      date: "April 18, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Arts Building, Studio 201",
      building: "Arts Building",
      room: "Studio 201",
      price: 199,
      originalPrice: 249,
      image: "https://images.pexels.com/photos/606541/pexels-photo-606541.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      organizer: "Photography Club",
      attendees: 45,
      maxAttendees: 80,
      rating: 4.9,
      tags: ["photography", "workshop", "editing", "professional"],
      featured: true,
    },
    {
      id: 6,
      title: "Sports Day Championship",
      description: "Inter-department sports competition featuring cricket, football, basketball, and track events.",
      category: "Sports",
      date: "April 22, 2024",
      time: "8:00 AM - 6:00 PM",
      location: "Sports Complex, Main Ground",
      building: "Sports Complex",
      room: "Main Ground",
      price: 0,
      originalPrice: 0,
      image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      organizer: "Sports Committee",
      attendees: 320,
      maxAttendees: 1000,
      rating: 4.4,
      tags: ["sports", "competition", "outdoor", "free"],
      popular: true,
    },
  ]

  // Use the actual events data (either from API or sample data) for counting
  const currentEvents = events.length > 0 ? events : sampleEvents

  const categories = [
    { id: "all", name: "All Events", icon: Calendar, count: currentEvents.length },
    {
      id: "Technology",
      name: "Technology",
      icon: Zap,
      count: currentEvents.filter((e) => e.category === "Technology").length,
    },
    { id: "Music", name: "Music", icon: Music, count: currentEvents.filter((e) => e.category === "Music").length },
    { id: "Arts", name: "Arts", icon: Palette, count: currentEvents.filter((e) => e.category === "Arts").length },
    { id: "Sports", name: "Sports", icon: Trophy, count: currentEvents.filter((e) => e.category === "Sports").length },
    {
      id: "Photography",
      name: "Photography",
      icon: Camera,
      count: currentEvents.filter((e) => e.category === "Photography").length,
    },
    { id: "Gaming", name: "Gaming", icon: Gamepad2, count: currentEvents.filter((e) => e.category === "Gaming").length },
    { id: "Literature", name: "Literature", icon: BookOpen, count: 0 },
  ]

  const priceRanges = [
    { id: "all", name: "All Prices" },
    { id: "free", name: "Free" },
    { id: "under100", name: "Under ₹100" },
    { id: "100-300", name: "₹100 - ₹300" },
    { id: "above300", name: "Above ₹300" },
  ]

  const dateFilters = [
    { id: "all", name: "All Dates" },
    { id: "today", name: "Today" },
    { id: "tomorrow", name: "Tomorrow" },
    { id: "week", name: "This Week" },
    { id: "month", name: "This Month" },
  ]

  const filteredEvents = (events.length > 0 ? events : sampleEvents).filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.tags && event.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))

    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory

    const matchesPrice =
      selectedPriceRange === "all" ||
      (selectedPriceRange === "free" && event.price === 0) ||
      (selectedPriceRange === "under100" && event.price > 0 && event.price < 100) ||
      (selectedPriceRange === "100-300" && event.price >= 100 && event.price <= 300) ||
      (selectedPriceRange === "above300" && event.price > 300)

    return matchesSearch && matchesCategory && matchesPrice
  })

  const handleAddToCart = (event: any) => {
    const cartItem = {
      eventId: event.id,
      title: event.title,
      price: event.price,
      date: event.date,
      time: event.time,
      location: event.location,
      building: event.building,
      room: event.room,
      category: event.category,
      image: event.image,
      organizer: event.organizer,
      quantity: 1,
      maxAttendees: event.maxAttendees,
      attendees: event.attendees,
    }

    addToCart(cartItem)
    addNotification({
      title: "Added to Cart! 🛒",
      message: `${event.title} has been added to your cart.`,
      type: "success",
      read: false,
    })
  }

  const handleBuyNow = (event: any) => {
    setSelectedEvent(event)
    setShowBookingModal(true)
  }

  const isInCart = (eventId: number) => {
    return cart.some((item) => item.eventId === eventId)
  }

  const EventCard = ({ event }: { event: any }) => (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={400}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-white text-gray-800 capitalize">{event.category}</Badge>
          {event.featured && (
            <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">Featured</Badge>
          )}
          {event.popular && <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">Popular</Badge>}
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorite(event.id)}
            className={`bg-white/80 backdrop-blur-sm hover:bg-white ${
              favorites.includes(event.id) ? "text-red-500" : "text-gray-600"
            }`}
          >
            <Heart className={`w-4 h-4 ${favorites.includes(event.id) ? "fill-current" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm" className="bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        {event.price < event.originalPrice && (
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-red-500 text-white">
              {Math.round(((event.originalPrice - event.price) / event.originalPrice) * 100)}% OFF
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2 group-hover:text-orange-500 transition-colors">{event.title}</CardTitle>
            <CardDescription className="text-sm text-gray-600 line-clamp-2">{event.description}</CardDescription>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-orange-500" />
            {event.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-orange-500" />
            {event.time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-orange-500" />
            <div>
              <div>{event.building}</div>
              <div className="text-xs text-gray-500">{event.room}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-1" />
              {event.attendees}/{event.maxAttendees}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              {event.rating}
            </div>
          </div>
          <div className="text-right">
            {event.price === 0 ? (
              <div className="text-2xl font-bold text-green-600">FREE</div>
            ) : (
              <div>
                <div className="text-2xl font-bold text-green-600">₹{event.price}</div>
                {event.price < event.originalPrice && (
                  <div className="text-sm text-gray-500 line-through">₹{event.originalPrice}</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center mb-4">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
            ></div>
          </div>
          <span className="ml-2 text-xs text-gray-600">
            {Math.round((event.attendees / event.maxAttendees) * 100)}% full
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => handleAddToCart(event)}
            disabled={isInCart(event.id)}
            variant="outline"
            className="flex-1 hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600 transition-colors"
          >
            {isInCart(event.id) ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
          <Button
            onClick={() => handleBuyNow(event)}
            className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transform hover:scale-105 transition-all duration-200"
          >
            Buy Now
          </Button>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {(event.tags ?? []).slice(0, 3).map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <AuthGuard requiredRole="student">
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Amazing Events</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find and book tickets for the most exciting events happening on campus. From tech talks to music festivals,
              there's something for everyone!
            </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search events, categories, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg rounded-full border-2 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          {/* Filter Tabs */}
          <Tabs defaultValue="category" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="category">Category</TabsTrigger>
              <TabsTrigger value="price">Price</TabsTrigger>
              <TabsTrigger value="date">Date</TabsTrigger>
            </TabsList>

            <TabsContent value="category" className="mt-4">
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                          : "hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="ml-1">
                        {category.count}
                      </Badge>
                    </Button>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="price" className="mt-4">
              <div className="flex flex-wrap justify-center gap-2">
                {priceRanges.map((range) => (
                  <Button
                    key={range.id}
                    variant={selectedPriceRange === range.id ? "default" : "outline"}
                    onClick={() => setSelectedPriceRange(range.id)}
                    className={
                      selectedPriceRange === range.id
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600"
                    }
                  >
                    {range.name}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="date" className="mt-4">
              <div className="flex flex-wrap justify-center gap-2">
                {dateFilters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedDate === filter.id ? "default" : "outline"}
                    onClick={() => setSelectedDate(filter.id)}
                    className={
                      selectedDate === filter.id
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "hover:bg-orange-50 hover:border-orange-500 hover:text-orange-600"
                    }
                  >
                    {filter.name}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            Showing {filteredEvents.length} of {events.length} events
            {searchQuery && (
              <span className="ml-1">
                for "<span className="font-semibold text-orange-600">{searchQuery}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all events.</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedPriceRange("all")
                setSelectedDate("all")
              }}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal event={selectedEvent} isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} />
      </div>
    </AuthGuard>
  )
}
