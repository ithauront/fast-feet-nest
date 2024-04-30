"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailUseCase = void 0;
const either_1 = require("../../../../core/either");
const email_1 = require("../../enterprise/entities/email");
class SendEmailUseCase {
    constructor(emailRepository, emailService) {
        this.emailRepository = emailRepository;
        this.emailService = emailService;
    }
    async execute({ recipientEmail, subject, body, }) {
        const email = email_1.Email.create({
            recipientEmail,
            subject,
            body,
        });
        await this.emailService.sendEmail(email.recipientEmail, email.subject, email.body);
        await this.emailRepository.create(email);
        return (0, either_1.right)({ email });
    }
}
exports.SendEmailUseCase = SendEmailUseCase;
//# sourceMappingURL=send-email.js.map