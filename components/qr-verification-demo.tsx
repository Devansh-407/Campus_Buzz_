"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { TicketVerificationService, VerificationResult } from "@/lib/ticket-verification"
import { EmailService } from "@/lib/email-service"
import {
  QrCode,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Scan,
  User,
  Calendar,
  Mail,
  Shield,
  Clock
} from "lucide-react"

export default function QRVerificationDemo() {
  const [qrInput, setQrInput] = useState("")
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const handleVerifyQR = () => {
    if (!qrInput.trim()) return

    setIsScanning(true)
    
    // Simulate scanning delay
    setTimeout(() => {
      const result = TicketVerificationService.verifyTicket(qrInput)
      setVerificationResult(result)
      setIsScanning(false)
    }, 1500)
  }

  const generateSampleQR = () => {
    // Generate a sample QR code for testing
    const sampleQR = JSON.stringify({
      id: "TKT-ABC12345",
      bid: `BK${Date.now()}`,
      eid: "1",
      email: "john.doe@example.com",
      hash: "a1b2c3d4e5f6g7h8",
      issued: new Date().toISOString()
    })
    setQrInput(sampleQR)
  }

  const getResultIcon = () => {
    if (!verificationResult) return null
    
    if (verificationResult.isValid) {
      return <CheckCircle className="w-8 h-8 text-green-600" />
    } else {
      return <XCircle className="w-8 h-8 text-red-600" />
    }
  }

  const getResultColor = () => {
    if (!verificationResult) return "gray"
    return verificationResult.isValid ? "green" : "red"
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-6 h-6 text-orange-500" />
            QR Code Verification Demo
          </CardTitle>
          <CardDescription>
            Test the secure QR code verification system for Campus Buzz events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="qr-input">QR Code Data</Label>
            <Textarea
              id="qr-input"
              value={qrInput}
              onChange={(e) => setQrInput(e.target.value)}
              placeholder="Paste QR code JSON data here..."
              rows={4}
              className="font-mono text-sm"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleVerifyQR} 
              disabled={!qrInput.trim() || isScanning}
              className="flex-1"
            >
              {isScanning ? (
                <>
                  <Scan className="w-4 h-4 mr-2 animate-pulse" />
                  Scanning...
                </>
              ) : (
                <>
                  <Scan className="w-4 h-4 mr-2" />
                  Verify QR Code
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={generateSampleQR}
              disabled={isScanning}
            >
              Generate Sample
            </Button>
          </div>
        </CardContent>
      </Card>

      {verificationResult && (
        <Card className={`border-2 ${verificationResult.isValid ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getResultIcon()}
              Verification Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge 
                className={`${verificationResult.isValid 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
                }`}
              >
                {verificationResult.isValid ? 'VALID TICKET' : 'INVALID TICKET'}
              </Badge>
            </div>

            {!verificationResult.isValid && (
              <div className="bg-red-100 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Verification Failed</span>
                </div>
                <p className="text-sm text-red-700 mt-1">{verificationResult.reason}</p>
              </div>
            )}

            {verificationResult.ticketInfo && (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Ticket Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Ticket ID:</span>
                    <span className="font-mono">{verificationResult.ticketInfo.ticketId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Event:</span>
                    <span>{verificationResult.ticketInfo.eventTitle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Name:</span>
                    <span>{verificationResult.ticketInfo.userName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Email:</span>
                    <span>{verificationResult.ticketInfo.userEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Event Date:</span>
                    <span>{verificationResult.ticketInfo.eventDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Status:</span>
                    <span className={verificationResult.ticketInfo.isUsed ? 'text-red-600' : 'text-green-600'}>
                      {verificationResult.ticketInfo.isUsed ? 'Already Used' : 'Valid for Entry'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Security Features</CardTitle>
          <CardDescription>How the QR code system prevents fraud</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-green-600 mt-0.5" />
              <div>
                <div className="font-medium">Cryptographic Hash</div>
                <div className="text-gray-600">Each QR code contains a unique hash that cannot be forged</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium">Email Verification</div>
                <div className="text-gray-600">QR codes are linked to the buyer's email address</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-orange-600 mt-0.5" />
              <div>
                <div className="font-medium">Time-Based Delivery</div>
                <div className="text-gray-600">QR codes are only sent on the event day</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
              <div>
                <div className="font-medium">One-Time Use</div>
                <div className="text-gray-600">Each QR code can only be scanned once</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
