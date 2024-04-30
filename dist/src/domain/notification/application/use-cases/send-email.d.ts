import { Either } from '@/core/either';
import { EmailRepository } from '../repositories/email-repository';
import { Email } from '../../enterprise/entities/email';
import { EmailService } from '../services/email-service';
export interface SendEmailUseCaseRequest {
    recipientEmail: string;
    subject: string;
    body: string;
}
export type SendEmailUseCaseResponse = Either<Error, {
    email: Email;
}>;
export declare class SendEmailUseCase {
    private emailRepository;
    private emailService;
    constructor(emailRepository: EmailRepository, emailService: EmailService);
    execute({ recipientEmail, subject, body, }: SendEmailUseCaseRequest): Promise<SendEmailUseCaseResponse>;
}
