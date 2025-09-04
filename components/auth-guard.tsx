"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"

interface AuthGuardProps {
  children: React.ReactNode
  requiredRole?: "student" | "admin"
  redirectTo?: string
}

export default function AuthGuard({ 
  children, 
  requiredRole, 
  redirectTo = "/auth" 
}: AuthGuardProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      router.push(redirectTo)
      return
    }

    // Check if user has required role
    if (requiredRole && user.role !== requiredRole) {
      if (user.role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/home")
      }
      return
    }
  }, [isAuthenticated, user, requiredRole, router, redirectTo])

  // Show loading or nothing while redirecting
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  // Check role mismatch
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return <>{children}</>
}
