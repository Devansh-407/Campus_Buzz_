import { QRService, QRCodeData, TicketData } from './qr-service'

export interface VerificationResult {
  isValid: boolean
  reason?: string
  ticketInfo?: {
    ticketId: string
    eventTitle: string
    userName: string
    userEmail: string
    eventDate: string
    isUsed: boolean
  }
}

export class TicketVerificationService {
  private static usedTickets: Set<string> = new Set()
  private static ticketDatabase: Map<string, TicketData> = new Map()

  // Store ticket data when booking is created
  static storeTicketData(ticketData: TicketData): void {
    this.ticketDatabase.set(ticketData.bookingId, ticketData)
  }

  // Verify QR code at event entrance
  static verifyTicket(qrCodeString: string, scannerEmail?: string): VerificationResult {
    try {
      // Parse QR code data (compact format from QR string)
      const qrData: any = JSON.parse(qrCodeString)
      
      // Find original ticket data
      const ticketData = this.ticketDatabase.get(qrData.bid) // bid = bookingId
      if (!ticketData) {
        return {
          isValid: false,
          reason: "Ticket not found in system"
        }
      }

      // Reconstruct full QR data for verification
      const fullQrData: QRCodeData = {
        ticketId: qrData.id,
        bookingId: qrData.bid,
        eventId: qrData.eid,
        userEmail: qrData.email,
        hash: qrData.hash,
        issuedAt: qrData.issued,
        validUntil: new Date(ticketData.eventDate + ' 23:59:59').toISOString()
      }

      // Verify QR code authenticity
      if (!QRService.verifyQRCode(fullQrData, ticketData)) {
        return {
          isValid: false,
          reason: "Invalid or tampered QR code"
        }
      }

      // Check if ticket was already used
      if (this.usedTickets.has(qrData.id)) {
        return {
          isValid: false,
          reason: "Ticket already used",
          ticketInfo: {
            ticketId: qrData.id,
            eventTitle: ticketData.eventTitle,
            userName: ticketData.userName,
            userEmail: ticketData.userEmail,
            eventDate: ticketData.eventDate,
            isUsed: true
          }
        }
      }

      // Check if it's the correct event date
      const eventDate = new Date(ticketData.eventDate)
      const today = new Date()
      const isEventDay = eventDate.toDateString() === today.toDateString()

      if (!isEventDay) {
        return {
          isValid: false,
          reason: `Ticket is only valid on ${eventDate.toDateString()}`
        }
      }

      // Mark ticket as used
      this.usedTickets.add(qrData.id)

      return {
        isValid: true,
        ticketInfo: {
          ticketId: qrData.id,
          eventTitle: ticketData.eventTitle,
          userName: ticketData.userName,
          userEmail: ticketData.userEmail,
          eventDate: ticketData.eventDate,
          isUsed: false
        }
      }

    } catch (error) {
      return {
        isValid: false,
        reason: "Invalid QR code format"
      }
    }
  }

  // Admin function to check ticket status
  static getTicketStatus(ticketId: string): { exists: boolean; isUsed: boolean; ticketData?: TicketData } {
    const isUsed = this.usedTickets.has(ticketId)
    
    // Find ticket data by searching through all stored tickets
    for (const [bookingId, ticketData] of this.ticketDatabase.entries()) {
      // In a real app, you'd have a proper ticket ID to booking ID mapping
      if (bookingId.includes(ticketId.substring(4))) { // Simple matching for demo
        return {
          exists: true,
          isUsed,
          ticketData
        }
      }
    }

    return { exists: false, isUsed: false }
  }

  // Reset used tickets (for testing purposes)
  static resetUsedTickets(): void {
    this.usedTickets.clear()
  }

  // Get all used tickets (for admin dashboard)
  static getUsedTickets(): string[] {
    return Array.from(this.usedTickets)
  }

  // Prevent ticket transfer by checking email match
  static validateEmailOwnership(qrCodeString: string, userEmail: string): boolean {
    try {
      const qrData = JSON.parse(qrCodeString)
      return qrData.email === userEmail
    } catch {
      return false
    }
  }
}
