import { EmailService } from '@/domain/notification/application/services/email-service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class SendGridEmailService extends EmailService {}
