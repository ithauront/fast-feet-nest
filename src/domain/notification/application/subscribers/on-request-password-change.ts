import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendEmailUseCase } from '../use-cases/send-email'
import { RequestPasswordChangeEvent } from '@/domain/delivery/enterprise/events/request-password-change'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnRequestPasswordChange implements EventHandler {
  constructor(private sendEmail: SendEmailUseCase) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendRequestPasswordChangeEmail.bind(this),
      RequestPasswordChangeEvent.name,
    )
  }

  private async sendRequestPasswordChangeEmail({
    accessToken,
    userEmail,
  }: RequestPasswordChangeEvent) {
    // Currently, we are using localhost for the reset link. Since this application is backend-focused, we will not create a user interface for password resetting. Instead, an endpoint in the infra layer of this application will handle the accessToken provided below and prompt for the new password.

    const resetPasswordUrl = `http://localhost:3000/reset-password?token=${accessToken}`
    await this.sendEmail.execute({
      recipientEmail: userEmail,
      subject: 'You requested a password change',
      body: `Please click on the link and follow the instructions to reset your password:${resetPasswordUrl}`,
    })
  }
}
