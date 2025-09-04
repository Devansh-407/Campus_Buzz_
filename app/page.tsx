"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Ticket, Music, Code, Palette, Trophy } from "lucide-react"
import { useEffect } from "react"
import { useAuth } from "@/lib/auth"

export default function LandingPage() {
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    // If user is already authenticated, redirect to their dashboard
    if (isAuthenticated && user) {
      if (user.role === "admin") {
        window.location.href = "/admin/dashboard"
      } else {
        window.location.href = "/home"
      }
    }
  }, [isAuthenticated, user])

  const featuredEvents = [
    {
      id: 1,
      title: "Tech Hackathon 2024",
      category: "Technology",
      date: "March 15, 2024",
      location: "Engineering Block A",
      price: "₹199",
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      icon: Code,
      attendees: 150,
    },
    {
      id: 2,
      title: "Spring Music Festival",
      category: "Music",
      date: "March 22, 2024",
      location: "Main Auditorium",
      price: "₹149",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      icon: Music,
      attendees: 500,
    },
    {
      id: 3,
      title: "Art & Painting Workshop",
      category: "Arts",
      date: "March 28, 2024",
      location: "Arts Building",
      price: "₹99",
      image: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      icon: Palette,
      attendees: 80,
    },
  ]

  const categories = [
    { name: "Technology", icon: Code, count: 12, color: "bg-green-100 text-green-800" },
    { name: "Music", icon: Music, count: 8, color: "bg-purple-100 text-purple-800" },
    { name: "Arts", icon: Palette, count: 15, color: "bg-orange-100 text-orange-800" },
    { name: "Sports", icon: Trophy, count: 10, color: "bg-red-100 text-red-800" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CB</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">Campus Buzz</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth">
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent">
                Sign In
              </Button>
            </Link>
            <Link href="/auth">
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Campus Events,{" "}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Simplified
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover, book, and manage college events seamlessly. From hackathons to music festivals, find your next
            adventure on Campus Buzz.
          </p>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            <Card className="border-2 border-orange-200 hover:border-orange-400 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Users className="w-12 h-12 mx-auto text-orange-500 mb-2" />
                <CardTitle className="text-xl">I'm a Student</CardTitle>
                <CardDescription>Discover events, buy tickets, and join the campus community</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/auth?role=student">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600">Sign Up as Student</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:border-pink-400 transition-colors cursor-pointer">
              <CardHeader className="text-center">
                <Calendar className="w-12 h-12 mx-auto text-pink-500 mb-2" />
                <CardTitle className="text-xl">I'm an Admin</CardTitle>
                <CardDescription>Create, manage, and organize amazing campus events</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/auth?role=admin">
                  <Button className="w-full bg-pink-500 hover:bg-pink-600">Sign Up as Admin</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check out some of the exciting events happening on campus this month
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredEvents.map((event) => {
            const IconComponent = event.icon
            return (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-white text-gray-800">{event.category}</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <IconComponent className="w-6 h-6 text-orange-500" />
                    <span className="text-2xl font-bold text-green-600">₹{event.price.replace('₹', '')}</span>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees} attending
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                    <Ticket className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Event Categories */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Event Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore events across different categories and find what interests you most
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.name} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <IconComponent className="w-12 h-12 mx-auto text-gray-700 mb-2" />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <Badge className={category.color}>{category.count} events</Badge>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Do</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Campus Buzz is your one-stop platform for all college events and activities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Event Discovery</h3>
              <p className="text-gray-600">
                Find exciting events happening across your campus with detailed information and easy booking
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ticket className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">
                Book tickets instantly with secure payment options and get digital tickets on your phone
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Building</h3>
              <p className="text-gray-600">
                Connect with fellow students, join communities, and make lasting memories together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Campus Buzz?</h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
            Start discovering amazing events, connect with your campus community, and make the most of your college
            experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth?role=student">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100">
                Join as Student
              </Button>
            </Link>
            <Link href="/auth?role=admin">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-500 bg-transparent"
              >
                Become an Admin
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CB</span>
              </div>
              <span className="text-xl font-bold">Campus Buzz</span>
            </div>
            <p className="text-gray-400"> 2024 Campus Buzz. Making college events accessible to everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
