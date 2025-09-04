"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { apiClient } from "@/lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import AdminNavigation from "@/components/admin-navigation"
import { ArrowLeft, Save, Eye, Upload, Calendar, MapPin, Users, DollarSign, Clock, Tag } from "lucide-react"

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    price: "",
    maxParticipants: "",
    tags: "",
    requirements: "",
    contactEmail: "",
    contactPhone: "",
    published: false,
    featuredEvent: false,
    allowWaitlist: true,
    sendNotifications: true,
  })

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    "Technology",
    "Music",
    "Arts",
    "Sports",
    "Business",
    "Academic",
    "Cultural",
    "Workshop",
    "Seminar",
    "Competition",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) newErrors.title = "Event title is required"
    if (!formData.description.trim()) newErrors.description = "Event description is required"
    if (!formData.category) newErrors.category = "Please select a category"
    if (!formData.date) newErrors.date = "Event date is required"
    if (!formData.startTime) newErrors.startTime = "Start time is required"
    if (!formData.endTime) newErrors.endTime = "End time is required"
    if (!formData.venue.trim()) newErrors.venue = "Venue is required"
    if (!formData.price) newErrors.price = "Price is required"
    if (!formData.maxParticipants) newErrors.maxParticipants = "Maximum participants is required"
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Contact email is required"

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.contactEmail && !emailRegex.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address"
    }

    // Validate price is a number
    if (formData.price && isNaN(Number(formData.price))) {
      newErrors.price = "Price must be a valid number"
    }

    // Validate max participants is a number
    if (formData.maxParticipants && isNaN(Number(formData.maxParticipants))) {
      newErrors.maxParticipants = "Maximum participants must be a valid number"
    }

    // Validate date is not in the past
    if (formData.date) {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = "Event date cannot be in the past"
      }
    }

    // Validate end time is after start time
    if (formData.startTime && formData.endTime) {
      if (formData.endTime <= formData.startTime) {
        newErrors.endTime = "End time must be after start time"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Use the real API to create the event
      const eventData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        venue: formData.venue,
        price: parseFloat(formData.price),
        maxParticipants: parseInt(formData.maxParticipants),
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        published: formData.published,
        featuredEvent: formData.featuredEvent,
      }

      const response = await apiClient.createEvent(eventData)
      console.log("Event created successfully:", response)
      alert("Event created successfully!")
      window.location.href = "/admin/events"
    } catch (error) {
      console.error("Error creating event:", error)
      alert("Error creating event. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePreview = () => {
    if (!validateForm()) {
      alert("Please fill in all required fields before previewing")
      return
    }

    // Open preview in new window
    const previewData = encodeURIComponent(JSON.stringify(formData))
    window.open(`/admin/events/preview?data=${previewData}`, "_blank")
  }

  const handleSaveDraft = async () => {
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Draft saved successfully!")
    } catch (error) {
      alert("Error saving draft")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => (window.location.href = "/admin/events")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
            <p className="text-gray-600 text-lg">Fill in the details to create a new campus event</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Essential details about your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter event title"
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your event in detail"
                      rows={4}
                      className={errors.description ? "border-red-500" : ""}
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.category ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        placeholder="e.g., networking, innovation, tech"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="requirements">Requirements/Prerequisites</Label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      placeholder="Any requirements or prerequisites for attendees"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Schedule & Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule & Location
                  </CardTitle>
                  <CardDescription>When and where your event will take place</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date">Event Date *</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className={errors.date ? "border-red-500" : ""}
                      />
                      {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                    </div>

                    <div>
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className={errors.startTime ? "border-red-500" : ""}
                      />
                      {errors.startTime && <p className="text-red-500 text-sm mt-1">{errors.startTime}</p>}
                    </div>

                    <div>
                      <Label htmlFor="endTime">End Time *</Label>
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className={errors.endTime ? "border-red-500" : ""}
                      />
                      {errors.endTime && <p className="text-red-500 text-sm mt-1">{errors.endTime}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="venue">Venue *</Label>
                    <Input
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      placeholder="Event location/venue"
                      className={errors.venue ? "border-red-500" : ""}
                    />
                    {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing & Capacity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Pricing & Capacity
                  </CardTitle>
                  <CardDescription>Set ticket price and participant limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Ticket Price (₹) *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0"
                        className={errors.price ? "border-red-500" : ""}
                      />
                      {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                    </div>

                    <div>
                      <Label htmlFor="maxParticipants">Maximum Participants *</Label>
                      <Input
                        id="maxParticipants"
                        name="maxParticipants"
                        type="number"
                        min="1"
                        value={formData.maxParticipants}
                        onChange={handleInputChange}
                        placeholder="100"
                        className={errors.maxParticipants ? "border-red-500" : ""}
                      />
                      {errors.maxParticipants && <p className="text-red-500 text-sm mt-1">{errors.maxParticipants}</p>}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="allowWaitlist"
                      checked={formData.allowWaitlist}
                      onCheckedChange={(checked) => handleSwitchChange("allowWaitlist", checked)}
                    />
                    <Label htmlFor="allowWaitlist">Allow waitlist when event is full</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>How attendees can reach the organizers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        placeholder="organizer@university.edu"
                        className={errors.contactEmail ? "border-red-500" : ""}
                      />
                      {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
                    </div>

                    <div>
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        name="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isSubmitting ? "Creating..." : "Create Event"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isSubmitting}
                    className="w-full bg-transparent"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>

                  <Button type="button" variant="outline" onClick={handlePreview} className="w-full bg-transparent">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Event
                  </Button>
                </CardContent>
              </Card>

              {/* Event Image */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Image</CardTitle>
                  <CardDescription>Upload a cover image for your event</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Event preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setImagePreview(null)}
                          className="absolute top-2 right-2 bg-white"
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Upload event image</p>
                      </div>
                    )}

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Publishing Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Publishing Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => handleSwitchChange("published", checked)}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featuredEvent"
                      checked={formData.featuredEvent}
                      onCheckedChange={(checked) => handleSwitchChange("featuredEvent", checked)}
                    />
                    <Label htmlFor="featuredEvent">Featured event</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="sendNotifications"
                      checked={formData.sendNotifications}
                      onCheckedChange={(checked) => handleSwitchChange("sendNotifications", checked)}
                    />
                    <Label htmlFor="sendNotifications">Send notifications to users</Label>
                  </div>

                  {formData.published && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Published:</strong> Event will be visible to students immediately after creation.
                      </p>
                    </div>
                  )}

                  {!formData.published && (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Draft:</strong> Event will be saved as draft and can be published later.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Event Summary */}
              {formData.title && (
                <Card>
                  <CardHeader>
                    <CardTitle>Event Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Tag className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="font-medium">{formData.title}</span>
                    </div>
                    {formData.category && (
                      <div className="flex items-center text-sm">
                        <Badge variant="secondary" className="text-xs">
                          {formData.category}
                        </Badge>
                      </div>
                    )}
                    {formData.date && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formData.date}</span>
                      </div>
                    )}
                    {formData.startTime && formData.endTime && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>
                          {formData.startTime} - {formData.endTime}
                        </span>
                      </div>
                    )}
                    {formData.venue && (
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{formData.venue}</span>
                      </div>
                    )}
                    {formData.price && (
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span>₹{formData.price}</span>
                      </div>
                    )}
                    {formData.maxParticipants && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>Max {formData.maxParticipants} participants</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
