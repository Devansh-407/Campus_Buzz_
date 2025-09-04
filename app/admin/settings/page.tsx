"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import AdminNavigation from "@/components/admin-navigation"
import { Save, Settings, Globe, Mail, Bell, Shield, Palette } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "Campus Buzz",
    siteDescription: "Your premier campus events platform",
    contactEmail: "admin@campusbuzz.edu",
    supportEmail: "support@campusbuzz.edu",
    enableNotifications: true,
    enableRegistrations: true,
    enablePayments: true,
    maintenanceMode: false,
    maxEventsPerStudent: 5,
    defaultEventCapacity: 100,
  })

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = () => {
    alert("Settings saved successfully!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <AdminNavigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="min-w-0 flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Website Settings</h1>
            <p className="text-gray-600 text-lg">Manage homepage and site configuration</p>
          </div>
          <Button
            onClick={handleSaveSettings}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex-shrink-0"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  General Settings
                </CardTitle>
                <CardDescription>Basic website configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange("siteName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={settings.siteDescription}
                    onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={settings.supportEmail}
                      onChange={(e) => handleInputChange("supportEmail", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Event Settings
                </CardTitle>
                <CardDescription>Configure event-related parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxEvents">Max Events per Student</Label>
                    <Input
                      id="maxEvents"
                      type="number"
                      value={settings.maxEventsPerStudent}
                      onChange={(e) => handleInputChange("maxEventsPerStudent", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="defaultCapacity">Default Event Capacity</Label>
                    <Input
                      id="defaultCapacity"
                      type="number"
                      value={settings.defaultEventCapacity}
                      onChange={(e) => handleInputChange("defaultEventCapacity", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Manage system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableNotifications">Enable Notifications</Label>
                    <p className="text-sm text-gray-600">Send email notifications to users</p>
                  </div>
                  <Switch
                    id="enableNotifications"
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) => handleInputChange("enableNotifications", checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableRegistrations">Enable Registrations</Label>
                    <p className="text-xs text-gray-600">Allow new event registrations</p>
                  </div>
                  <Switch
                    id="enableRegistrations"
                    checked={settings.enableRegistrations}
                    onCheckedChange={(checked) => handleInputChange("enableRegistrations", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enablePayments">Enable Payments</Label>
                    <p className="text-xs text-gray-600">Process online payments</p>
                  </div>
                  <Switch
                    id="enablePayments"
                    checked={settings.enablePayments}
                    onCheckedChange={(checked) => handleInputChange("enablePayments", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-xs text-gray-600">Disable public access</p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Palette className="w-4 h-4 mr-2" />
                  Customize Theme
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Templates
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
