"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRecipientEmailUseCase = void 0;
const either_1 = require("../../../../../core/either");
const user_not_found_error_1 = require("../errors/user-not-found-error");
class GetRecipientEmailUseCase {
    constructor(recipientRepository, authorizationService) {
        this.recipientRepository = recipientRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, recipientEmail, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const recipient = await this.recipientRepository.findByEmail(recipientEmail);
        if (!recipient) {
            return (0, either_1.left)(new user_not_found_error_1.UserNotFoundError());
        }
        return (0, either_1.right)(recipient);
    }
}
exports.GetRecipientEmailUseCase = GetRecipientEmailUseCase;
//# sourceMappingURL=get-recipient-by-email.js.map