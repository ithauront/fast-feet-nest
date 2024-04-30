import { EmailService } from '@/domain/notification/application/services/email-service'

export class MockEmailService extends EmailService {
  public lastEmail: { to: string; subject: string; body: string } | null = null

  sendEmail(to: string, subject: string, body: string): Promise<void> {
    this.lastEmail = { to, subject, body }
    return Promise.resolve()
  }
}
