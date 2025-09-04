"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { apiClient } from "./api"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "admin"
  department: string
  year?: string
  phone: string
  avatar?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, role: "student" | "admin") => Promise<boolean>
  signup: (userData: any) => Promise<boolean>
  logout: () => void
  updateProfile: (userData: Partial<User>) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string, role: "student" | "admin") => {
        try {
          const response = await apiClient.login(email, password)
          
          const user: User = {
            id: response.user.id.toString(),
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            department: response.user.department,
            year: response.user.year,
            phone: response.user.phone,
            avatar: "/placeholder.svg?height=40&width=40&text=User",
          }

          set({ user, isAuthenticated: true })
          return true
        } catch (error) {
          console.error('Login failed:', error)
          return false
        }
      },

      signup: async (userData: any) => {
        try {
          const response = await apiClient.register(userData)
          
          const user: User = {
            id: response.user.id.toString(),
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            department: response.user.department,
            year: response.user.year,
            phone: response.user.phone,
            avatar: "/placeholder.svg?height=40&width=40&text=User",
          }

          set({ user, isAuthenticated: true })
          return true
        } catch (error) {
          console.error('Signup failed:', error)
          return false
        }
      },

      logout: () => {
        // Clear API token
        apiClient.clearToken()
        set({ user: null, isAuthenticated: false })
        // Clear user-related data from store
        if (typeof window !== "undefined") {
          // Clear localStorage data
          localStorage.removeItem("auth-storage")
          localStorage.removeItem("campus-buzz-store")
          // Redirect to landing page
          window.location.href = "/"
        }
      },

      updateProfile: (userData: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } })
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)
