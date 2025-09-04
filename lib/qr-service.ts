import crypto from 'crypto'

export interface TicketData {
  bookingId: string
  eventId: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventLocation: string
  userName: string
  userEmail: string
  userPhone: string
  ticketQuantity: number
  totalAmount: number
  bookingTimestamp: string
}

export interface QRCodeData {
  ticketId: string
  bookingId: string
  eventId: string
  userEmail: string
  hash: string
  issuedAt: string
  validUntil: string
}

export class QRService {
  private static generateSecureHash(data: string, secret: string): string {
    return crypto.createHmac('sha256', secret).update(data).digest('hex')
  }

  private static generateTicketId(): string {
    return 'TKT-' + crypto.randomBytes(8).toString('hex').toUpperCase()
  }

  static generateQRCode(ticketData: TicketData): QRCodeData {
    const ticketId = this.generateTicketId()
    const secret = process.env.QR_SECRET || 'campus-buzz-secret-key-2024'
    
    // Create unique data string for hashing
    const dataString = `${ticketId}|${ticketData.bookingId}|${ticketData.eventId}|${ticketData.userEmail}|${ticketData.eventDate}`
    const hash = this.generateSecureHash(dataString, secret)
    
    const qrData: QRCodeData = {
      ticketId,
      bookingId: ticketData.bookingId,
      eventId: ticketData.eventId,
      userEmail: ticketData.userEmail,
      hash,
      issuedAt: new Date().toISOString(),
      validUntil: new Date(ticketData.eventDate + ' 23:59:59').toISOString()
    }

    return qrData
  }

  static verifyQRCode(qrData: QRCodeData, originalTicketData: TicketData): boolean {
    const secret = process.env.QR_SECRET || 'campus-buzz-secret-key-2024'
    const dataString = `${qrData.ticketId}|${qrData.bookingId}|${qrData.eventId}|${qrData.userEmail}|${originalTicketData.eventDate}`
    const expectedHash = this.generateSecureHash(dataString, secret)
    
    // Verify hash matches
    if (qrData.hash !== expectedHash) {
      return false
    }

    // Verify not expired
    if (new Date() > new Date(qrData.validUntil)) {
      return false
    }

    // Verify email matches
    if (qrData.userEmail !== originalTicketData.userEmail) {
      return false
    }

    return true
  }

  static generateQRCodeString(qrData: QRCodeData): string {
    // Create a compact QR code string
    return JSON.stringify({
      id: qrData.ticketId,
      bid: qrData.bookingId,
      eid: qrData.eventId,
      email: qrData.userEmail,
      hash: qrData.hash.substring(0, 16), // Truncate for QR size
      issued: qrData.issuedAt
    })
  }
}
