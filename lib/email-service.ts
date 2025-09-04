import { TicketData, QRService, QRCodeData } from './qr-service'

export interface EmailScheduleData {
  id: string
  ticketData: TicketData
  qrData: QRCodeData
  scheduledFor: string
  status: 'pending' | 'sent' | 'failed'
  createdAt: string
}

export class EmailService {
  private static scheduledEmails: Map<string, EmailScheduleData> = new Map()

  static scheduleQREmail(ticketData: TicketData): string {
    const qrData = QRService.generateQRCode(ticketData)
    const scheduleId = `EMAIL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Schedule email for event date at 6 AM
    const eventDate = new Date(ticketData.eventDate)
    const scheduledDate = new Date(eventDate)
    scheduledDate.setHours(6, 0, 0, 0)
    
    const emailSchedule: EmailScheduleData = {
      id: scheduleId,
      ticketData,
      qrData,
      scheduledFor: scheduledDate.toISOString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    }

    this.scheduledEmails.set(scheduleId, emailSchedule)
    
    // In a real app, this would integrate with a job scheduler like node-cron or AWS SQS
    this.scheduleEmailJob(emailSchedule)
    
    return scheduleId
  }

  private static scheduleEmailJob(emailSchedule: EmailScheduleData) {
    const now = new Date()
    const scheduledTime = new Date(emailSchedule.scheduledFor)
    const delay = scheduledTime.getTime() - now.getTime()

    if (delay > 0) {
      // Schedule the email to be sent
      setTimeout(() => {
        this.sendQREmail(emailSchedule)
      }, delay)
    } else {
      // If the event date has passed, send immediately (for testing)
      this.sendQREmail(emailSchedule)
    }
  }

  private static async sendQREmail(emailSchedule: EmailScheduleData) {
    try {
      const { ticketData, qrData } = emailSchedule
      
      // Generate QR code string for the email
      const qrCodeString = QRService.generateQRCodeString(qrData)
      
      // In a real app, this would use a service like SendGrid, Nodemailer, or AWS SES
      const emailContent = this.generateEmailTemplate(ticketData, qrData, qrCodeString)
      
      // Simulate email sending
      console.log(`Sending QR email to: ${ticketData.userEmail}`)
      console.log(`QR Code Data: ${qrCodeString}`)
      
      // Update status
      emailSchedule.status = 'sent'
      this.scheduledEmails.set(emailSchedule.id, emailSchedule)
      
      // In a real implementation, you would call your email provider here
      // await this.sendEmailViaProvider(ticketData.userEmail, emailContent)
      
    } catch (error) {
      console.error('Failed to send QR email:', error)
      emailSchedule.status = 'failed'
      this.scheduledEmails.set(emailSchedule.id, emailSchedule)
    }
  }

  private static generateEmailTemplate(ticketData: TicketData, qrData: QRCodeData, qrCodeString: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your Event Ticket - ${ticketData.eventTitle}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f97316, #ec4899); color: white; padding: 20px; border-radius: 8px; text-align: center; }
        .ticket { background: #f8f9fa; border: 2px dashed #dee2e6; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .qr-section { text-align: center; background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎫 Your Event Ticket</h1>
            <p>Campus Buzz - ${ticketData.eventTitle}</p>
        </div>
        
        <div class="ticket">
            <h2>Event Details</h2>
            <p><strong>Event:</strong> ${ticketData.eventTitle}</p>
            <p><strong>Date:</strong> ${ticketData.eventDate}</p>
            <p><strong>Time:</strong> ${ticketData.eventTime}</p>
            <p><strong>Location:</strong> ${ticketData.eventLocation}</p>
            <p><strong>Tickets:</strong> ${ticketData.ticketQuantity}</p>
            <p><strong>Booking ID:</strong> ${ticketData.bookingId}</p>
        </div>

        <div class="qr-section">
            <h2>🔒 Your Secure QR Code</h2>
            <p><strong>Ticket ID:</strong> ${qrData.ticketId}</p>
            <div style="font-family: monospace; background: #f1f3f4; padding: 10px; border-radius: 4px; word-break: break-all; font-size: 12px;">
                ${qrCodeString}
            </div>
            <p style="margin-top: 15px;"><em>Present this QR code at the event entrance</em></p>
        </div>

        <div class="warning">
            <h3>⚠️ Important Security Information</h3>
            <ul>
                <li>This QR code is unique to you and cannot be transferred</li>
                <li>Do not share this QR code with anyone</li>
                <li>The QR code is linked to your email: ${ticketData.userEmail}</li>
                <li>Valid until: ${new Date(qrData.validUntil).toLocaleDateString()}</li>
                <li>Report any suspicious activity to support@campusbuzz.com</li>
            </ul>
        </div>

        <div class="footer">
            <p>This email was sent automatically on the day of your event.</p>
            <p>Campus Buzz Event Management System</p>
        </div>
    </div>
</body>
</html>
    `
  }

  static getScheduledEmail(scheduleId: string): EmailScheduleData | undefined {
    return this.scheduledEmails.get(scheduleId)
  }

  static getAllScheduledEmails(): EmailScheduleData[] {
    return Array.from(this.scheduledEmails.values())
  }

  static cancelScheduledEmail(scheduleId: string): boolean {
    return this.scheduledEmails.delete(scheduleId)
  }
}
