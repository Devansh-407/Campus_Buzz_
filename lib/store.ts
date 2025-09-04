"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin"
  phone?: string
  department?: string
  year?: string
  studentId?: string
  adminId?: string
}

interface CartItem {
  eventId: number
  title: string
  price: number
  date: string
  time: string
  location: string
  building: string
  room: string
  category: string
  image: string
  organizer: string
  quantity: number
  maxAttendees: number
  attendees: number
}

interface Notification {
  id: string
  title: string
  message: string
  type: "success" | "error" | "info" | "warning"
  read: boolean
  timestamp: Date
}

interface Ticket {
  id: string
  eventId: number
  title: string
  category: string
  date: string
  time: string
  location: string
  building: string
  room: string
  price: number
  purchaseDate: string
  status: "confirmed" | "completed" | "cancelled"
  image: string
  organizer: string
  organizerContact: string
  organizerEmail: string
  qrCode: string
  seatNumber: string
  ticketType: string
  orderNumber: string
  paymentMethod: string
  refundable: boolean
  transferable: boolean
  description: string
  quantity: number
  rating?: number
  feedback?: string
  cancellationReason?: string
  refundAmount?: number
  refundStatus?: string
}

interface Store {
  user: User | null
  cart: CartItem[]
  favorites: number[]
  notifications: Notification[]
  tickets: Ticket[]
  setUser: (user: User | null) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (eventId: number) => void
  updateCartQuantity: (eventId: number, quantity: number) => void
  clearCart: () => void
  toggleFavorite: (eventId: number) => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  markNotificationAsRead: (id: string) => void
  clearNotifications: () => void
  addTicket: (ticket: Ticket) => void
  updateTicketRating: (ticketId: string, rating: number, feedback?: string) => void
  clearUserData: () => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,
      cart: [],
      favorites: [],
      notifications: [],
      tickets: [
        {
          id: "TKT001",
          eventId: 1,
          title: "Annual Tech Summit 2024",
          category: "Technology",
          date: "March 25, 2024",
          time: "10:00 AM - 6:00 PM",
          location: "Engineering Block A, Main Auditorium",
          building: "Engineering Block A",
          room: "Main Auditorium",
          price: 399,
          purchaseDate: "March 10, 2024",
          status: "confirmed",
          image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          organizer: "Tech Club",
          organizerContact: "+91 98765 43210",
          organizerEmail: "techclub@college.edu",
          qrCode:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmZmIi8+PHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=",
          seatNumber: "A-15",
          ticketType: "Regular",
          orderNumber: "ORD2024001",
          paymentMethod: "UPI",
          refundable: true,
          transferable: true,
          description: "Join industry leaders and innovators for a day of cutting-edge technology discussions.",
          quantity: 1,
        },
        {
          id: "TKT002",
          eventId: 2,
          title: "Spring Music Festival",
          category: "Music",
          date: "March 30, 2024",
          time: "6:00 PM - 11:00 PM",
          location: "Main Campus Ground, Open Air Stage",
          building: "Main Campus",
          room: "Open Air Stage",
          price: 299,
          purchaseDate: "March 12, 2024",
          status: "confirmed",
          image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          organizer: "Cultural Committee",
          organizerContact: "+91 98765 43211",
          organizerEmail: "cultural@college.edu",
          qrCode:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjE1IiB5PSIxNSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjZmZmIi8+PHJlY3QgeD0iMzAiIHk9IjMwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMDAiLz48L3N2Zz4=",
          seatNumber: "General",
          ticketType: "VIP",
          orderNumber: "ORD2024002",
          paymentMethod: "Credit Card",
          refundable: true,
          transferable: true,
          description: "Experience amazing live performances from local and national artists.",
          quantity: 2,
        },
        {
          id: "TKT003",
          eventId: 4,
          title: "Winter Hackathon 2024",
          category: "Technology",
          date: "February 15, 2024",
          time: "9:00 AM - 9:00 PM",
          location: "Engineering Block B, Lab 301",
          building: "Engineering Block B",
          room: "Lab 301",
          price: 199,
          purchaseDate: "February 1, 2024",
          status: "completed",
          image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          organizer: "Tech Club",
          organizerContact: "+91 98765 43210",
          organizerEmail: "techclub@college.edu",
          qrCode:
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZmZmIi8+PC9zdmc+",
          seatNumber: "Team-05",
          ticketType: "Participant",
          orderNumber: "ORD2024004",
          paymentMethod: "UPI",
          refundable: false,
          transferable: false,
          description: "24-hour coding marathon with exciting challenges and prizes.",
          quantity: 1,
          rating: 4.8,
          feedback: "Amazing event! Great organization and challenging problems.",
        },
      ],
      setUser: (user) => set({ user }),
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find((cartItem) => cartItem.eventId === item.eventId)
          if (existingItem) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.eventId === item.eventId
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem,
              ),
            }
          }
          return { cart: [...state.cart, item] }
        }),
      removeFromCart: (eventId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.eventId !== eventId),
        })),
      updateCartQuantity: (eventId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) => (item.eventId === eventId ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ cart: [] }),
      toggleFavorite: (eventId) =>
        set((state) => ({
          favorites: state.favorites.includes(eventId)
            ? state.favorites.filter((id) => id !== eventId)
            : [...state.favorites, eventId],
        })),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: Date.now().toString(),
              timestamp: new Date(),
            },
            ...state.notifications,
          ],
        })),
      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification,
          ),
        })),
      clearNotifications: () => set({ notifications: [] }),
      addTicket: (ticket) =>
        set((state) => ({
          tickets: [...state.tickets, ticket],
        })),
      updateTicketRating: (ticketId, rating, feedback) =>
        set((state) => ({
          tickets: state.tickets.map((ticket) => (ticket.id === ticketId ? { ...ticket, rating, feedback } : ticket)),
        })),
      clearUserData: () =>
        set({
          cart: [],
          favorites: [],
          notifications: [],
          tickets: [],
        }),
    }),
    {
      name: "campus-buzz-store",
    },
  ),
)
