"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useStore } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ShoppingCart,
  Calendar,
  Ticket,
  Home,
  Sparkles,
} from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { user, logout } = useAuth()
  const { cart, notifications, markNotificationAsRead, clearNotifications } = useStore()

  const unreadNotifications = notifications.filter((n) => !n.read)
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/events?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleNotificationClick = (notification: any) => {
    markNotificationAsRead(notification.id)
    if (notification.type === "success" && notification.title.includes("Cart")) {
      window.location.href = "/cart"
    }
  }

  const handleSettingsClick = () => {
    // Navigate to settings page
    window.location.href = "/settings"
  }

  const handleLogout = () => {
    logout()
    window.location.href = "/"
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Campus Buzz
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/home"
              className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/events"
              className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Events</span>
            </Link>
            <Link
              href="/my-tickets"
              className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition-colors"
            >
              <Ticket className="w-4 h-4" />
              <span>My Tickets</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadNotifications.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      {unreadNotifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Notifications
                  {notifications.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearNotifications}>
                      Clear All
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>No notifications yet</p>
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.slice(0, 5).map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className="flex flex-col items-start p-3 cursor-pointer"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-sm">{notification.title}</span>
                          {!notification.read && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <span className="text-xs text-gray-400 mt-1">
                          {new Date(notification.timestamp).toLocaleTimeString()}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">{user?.name || "User"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name || "User"}</span>
                    <span className="text-xs text-gray-500 font-normal">{user?.email}</span>
                    <Badge className="mt-1 w-fit text-xs capitalize">{user?.role || "student"}</Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSettingsClick}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </form>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <Link
                  href="/home"
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
                <Link
                  href="/events"
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Events</span>
                </Link>
                <Link
                  href="/my-tickets"
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Ticket className="w-4 h-4" />
                  <span>My Tickets</span>
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({cartItemsCount})</span>
                </Link>
                <button
                  onClick={() => {
                    handleSettingsClick()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 py-2 w-full text-left"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
