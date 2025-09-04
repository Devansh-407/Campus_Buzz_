"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, EyeOff, Users, Calendar, ArrowLeft, Mail, Lock, User, Phone, GraduationCap, Building } from "lucide-react"

import { useAuth } from "@/lib/auth"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [userRole, setUserRole] = useState<"student" | "admin">("student")

  const searchParams = useSearchParams()
  const router = useRouter()
  const { login, signup } = useAuth()

  useEffect(() => {
    const role = searchParams.get("role")
    if (role === "admin" || role === "student") {
      setUserRole(role)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent, type: "login" | "signup") => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)

    try {
      if (type === "login") {
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        const success = await login(email, password, userRole)
        if (success) {
          // Redirect based on role
          if (userRole === "admin") {
            router.push("/admin/dashboard")
          } else {
            router.push("/home")
          }
        }
      } else {
        const userData = {
          firstName: formData.get("firstName") as string,
          lastName: formData.get("lastName") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          role: userRole,
          department: formData.get("department") as string,
          year: userRole === "student" ? (formData.get("year") as string) : undefined,
          adminId: userRole === "admin" ? (formData.get("adminId") as string) : undefined,
          studentId: userRole === "student" ? (formData.get("studentId") as string) : undefined,
          password: formData.get("password") as string,
        }

        const success = await signup(userData)
        if (success) {
          // Redirect based on role
          if (userRole === "admin") {
            router.push("/admin/dashboard")
          } else {
            router.push("/home")
          }
        }
      }
    } catch (error) {
      console.error("Authentication error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleRole = () => {
    const newRole = userRole === "student" ? "admin" : "student"
    setUserRole(newRole)
    router.push(`/auth?role=${newRole}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CB</span>
            </div>
            <span className="text-3xl font-bold text-gray-900">Campus Buzz</span>
          </div>

          {/* Role Badge */}
          <div className="flex items-center justify-center mb-4">
            <Badge
              className={`text-sm px-4 py-2 ${
                userRole === "admin"
                  ? "bg-pink-100 text-pink-800 border-pink-200"
                  : "bg-orange-100 text-orange-800 border-orange-200"
              }`}
            >
              {userRole === "admin" ? (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Admin Access
                </>
              ) : (
                <>
                  <Users className="w-4 h-4 mr-2" />
                  Student Access
                </>
              )}
            </Badge>
          </div>

          <button onClick={toggleRole} className="text-sm text-gray-600 hover:text-gray-800 underline">
            Switch to {userRole === "admin" ? "Student" : "Admin"} Access
          </button>
        </div>

        {/* Auth Card */}
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold">
              {userRole === "admin" ? "Admin Portal" : "Student Portal"}
            </CardTitle>
            <CardDescription>
              {userRole === "admin"
                ? "Manage and create amazing campus events"
                : "Discover and book exciting campus events"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login">
                <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        name="email"
                        placeholder={userRole === "admin" ? "admin@college.edu" : "student@college.edu"}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-orange-600 hover:text-orange-700">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full ${
                      userRole === "admin" ? "bg-pink-500 hover:bg-pink-600" : "bg-orange-500 hover:bg-orange-600"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              {/* Signup Tab */}
              <TabsContent value="signup">
                <form onSubmit={(e) => handleSubmit(e, "signup")} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signup-firstname"
                          name="firstName"
                          type="text"
                          placeholder="John"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname">Last Name</Label>
                      <Input id="signup-lastname" name="lastName" type="text" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder={userRole === "admin" ? "admin@college.edu" : "student@college.edu"}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Role-specific fields */}
                  {userRole === "student" ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="student-id">Student ID</Label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="student-id"
                            name="studentId"
                            type="text"
                            placeholder="STU2024001"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <select
                          id="department"
                          name="department"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Department</option>
                          <option value="computer-science">Computer Science</option>
                          <option value="electrical">Electrical Engineering</option>
                          <option value="mechanical">Mechanical Engineering</option>
                          <option value="civil">Civil Engineering</option>
                          <option value="business">Business Administration</option>
                          <option value="arts">Arts & Literature</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Year of Study</Label>
                        <select
                          id="year"
                          name="year"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Year</option>
                          <option value="1">1st Year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="admin-id">Admin ID</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="admin-id"
                            name="adminId"
                            type="text"
                            placeholder="ADM2024001"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-department">Department/Office</Label>
                        <select
                          id="admin-department"
                          name="department"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select Department</option>
                          <option value="student-affairs">Student Affairs</option>
                          <option value="academic-office">Academic Office</option>
                          <option value="cultural-committee">Cultural Committee</option>
                          <option value="sports-committee">Sports Committee</option>
                          <option value="tech-committee">Technical Committee</option>
                        </select>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <input type="checkbox" className="mt-1 rounded" required />
                    <span className="text-gray-600">
                      I agree to the{" "}
                      <Link href="/terms" className="text-orange-600 hover:text-orange-700">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-orange-600 hover:text-orange-700">
                        Privacy Policy
                      </Link>
                    </span>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full ${
                      userRole === "admin" ? "bg-pink-500 hover:bg-pink-600" : "bg-orange-500 hover:bg-orange-600"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Social Login Options */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <Button variant="outline" className="w-full bg-transparent">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Need help? Contact{" "}
          <Link href="mailto:support@campusbuzz.edu" className="text-orange-600 hover:text-orange-700">
            support@campusbuzz.edu
          </Link>
        </div>
      </div>
    </div>
  )
}
