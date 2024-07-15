import { EmailService } from '@/domain/notification/application/services/email-service'
import { Injectable } from '@nestjs/common'
import * as SibApiV3Sdk from 'sib-api-v3-sdk'
import { EnvService } from '../../env/env.service'

@Injectable()
export class SendInBlueEmailService extends EmailService {
  private apiInstance

  constructor(private envService: EnvService) {
    super()
    SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
      envService.get('SENDINBLUE_EMAIL_API_KEY')
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
  }

  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

    sendSmtpEmail.to = [{ email: to }]
    sendSmtpEmail.subject = subject
    sendSmtpEmail.htmlContent = body
    sendSmtpEmail.sender = {
      email: 'tfastfeet@gmail.com',
      name: 'Fast-feet team',
    }

    try {
      await this.apiInstance.sendTransacEmail(sendSmtpEmail)
      console.log('Email sent successfully')
    } catch (error) {
      console.error('Failed to send email:', error)
      throw error
    }
  }
}
