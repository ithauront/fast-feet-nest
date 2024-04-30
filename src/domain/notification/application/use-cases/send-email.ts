import { Either, right } from '@/core/either'
import { EmailRepository } from '../repositories/email-repository'
import { Email } from '../../enterprise/entities/email'
import { EmailService } from '../services/email-service'

export interface SendEmailUseCaseRequest {
  recipientEmail: string
  subject: string
  body: string
}

export type SendEmailUseCaseResponse = Either<Error, { email: Email }>

export class SendEmailUseCase {
  constructor(
    private emailRepository: EmailRepository,
    private emailService: EmailService,
  ) {}

  async execute({
    recipientEmail,
    subject,
    body,
  }: SendEmailUseCaseRequest): Promise<SendEmailUseCaseResponse> {
    const email = Email.create({
      recipientEmail,
      subject,
      body,
    })

    await this.emailService.sendEmail(
      email.recipientEmail,
      email.subject,
      email.body,
    )
    await this.emailRepository.create(email)

    return right({ email })
  }
}
