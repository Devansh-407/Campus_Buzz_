"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth"
import {
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Calendar,
  Users,
  DollarSign,
  FileText,
  MessageSquare,
  BarChart3,
  Home,
} from "lucide-react"

export default function AdminNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  const navigationItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Revenue", href: "/admin/revenue", icon: DollarSign },
    { name: "Reports", href: "/admin/reports", icon: FileText },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Feedback", href: "/admin/feedback", icon: MessageSquare },
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Campus Buzz
              </span>
              <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">Admin</Badge>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:text-blue-600 hover:bg-blue-50 text-gray-700"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Admin Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start p-3">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">New Event Registration</span>
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">25 new students registered for Tech Summit</p>
                    <span className="text-xs text-gray-400 mt-1">5 minutes ago</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start p-3">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">Payment Received</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">₹15,000 collected from Music Festival</p>
                    <span className="text-xs text-gray-400 mt-1">1 hour ago</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start p-3">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">Feedback Submitted</span>
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">New feedback for Winter Hackathon</p>
                    <span className="text-xs text-gray-400 mt-1">2 hours ago</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Admin Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium">{user?.name || "Admin"}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user?.name || "Admin User"}</span>
                    <span className="text-xs text-gray-500 font-normal">{user?.email}</span>
                    <Badge className="mt-1 w-fit text-xs bg-blue-100 text-blue-800">Administrator</Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => (window.location.href = "/admin/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Admin Settings
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
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
