"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeRecipientEmailUseCase = void 0;
const either_1 = require("../../../../../core/either");
const user_not_found_error_1 = require("../errors/user-not-found-error");
class ChangeRecipientEmailUseCase {
    constructor(recipientRepository, authorizationService) {
        this.recipientRepository = recipientRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, recipientEmail, newEmail, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const recipient = await this.recipientRepository.findByEmail(recipientEmail);
        if (!recipient) {
            return (0, either_1.left)(new user_not_found_error_1.UserNotFoundError());
        }
        recipient.email = newEmail;
        await this.recipientRepository.save(recipient);
        return (0, either_1.right)(recipient);
    }
}
exports.ChangeRecipientEmailUseCase = ChangeRecipientEmailUseCase;
//# sourceMappingURL=change-recipient-email.js.map