"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import AdminNavigation from "@/components/admin-navigation"
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react"

export default function EditEventPage({ params }: { params: { id: string } }) {
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
    contactEmail: "",
    contactPhone: "",
    published: false,
    featuredEvent: false,
  })

  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  useEffect(() => {
    // Simulate API call to fetch event data
    const fetchEventData = async () => {
      try {
        // Mock data - in real app, this would come from API
        const mockEventData = {
          title: "Annual Tech Summit 2024",
          description:
            "Join industry leaders and innovators for cutting-edge technology discussions and networking opportunities.",
          category: "Technology",
          date: "2024-03-25",
          startTime: "10:00",
          endTime: "18:00",
          venue: "Engineering Block A, Main Auditorium",
          price: "399",
          maxParticipants: "300",
          contactEmail: "techsummit@university.edu",
          contactPhone: "+91 98765 43210",
          published: true,
          featuredEvent: false,
        }

        setFormData(mockEventData)
      } catch (error) {
        console.error("Error fetching event data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEventData()
  }, [params.id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("Event updated successfully!")
      window.location.href = `/admin/events/${params.id}`
    } catch (error) {
      alert("Error updating event. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      try {
        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        alert("Event deleted successfully!")
        window.location.href = "/admin/events"
      } catch (error) {
        alert("Error deleting event. Please try again.")
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <AdminNavigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading event data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => (window.location.href = `/admin/events/${params.id}`)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Event
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
              <p className="text-gray-600 text-lg">Update event details and settings</p>
            </div>
          </div>
          <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Event
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Update essential details about your event</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Event Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter event title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your event"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule & Location */}
              <Card>
                <CardHeader>
                  <CardTitle>Schedule & Location</CardTitle>
                  <CardDescription>Update when and where your event will take place</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date">Event Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="startTime">Start Time</Label>
                      <Input
                        id="startTime"
                        name="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="venue">Venue</Label>
                    <Input
                      id="venue"
                      name="venue"
                      value={formData.venue}
                      onChange={handleInputChange}
                      placeholder="Event location"
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Pricing & Capacity */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing & Capacity</CardTitle>
                  <CardDescription>Update ticket price and participant limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Ticket Price (₹)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxParticipants">Maximum Participants</Label>
                      <Input
                        id="maxParticipants"
                        name="maxParticipants"
                        type="number"
                        min="1"
                        value={formData.maxParticipants}
                        onChange={handleInputChange}
                        placeholder="100"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Update organizer contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        name="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        placeholder="organizer@university.edu"
                        required
                      />
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
                    {isSubmitting ? "Updating..." : "Update Event"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => (window.location.href = `/admin/events/${params.id}`)}
                    className="w-full bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Event
                  </Button>
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
                    <Label htmlFor="published">Published</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="featuredEvent"
                      checked={formData.featuredEvent}
                      onCheckedChange={(checked) => handleSwitchChange("featuredEvent", checked)}
                    />
                    <Label htmlFor="featuredEvent">Featured event</Label>
                  </div>

                  {formData.published ? (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        <strong>Published:</strong> Event is visible to students.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <strong>Draft:</strong> Event is not visible to students.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>Irreversible and destructive actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Event
                  </Button>
                  <p className="text-xs text-gray-600 mt-2">
                    This will permanently delete the event and all associated data.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
