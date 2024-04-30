"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRecipientUseCase = void 0;
const either_1 = require("../../../../../core/either");
const recipient_1 = require("../../../enterprise/entities/recipient");
const user_already_exists_error_1 = require("../errors/user-already-exists-error");
class RegisterRecipientUseCase {
    constructor(recipientRepository, authorizationService) {
        this.recipientRepository = recipientRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, name, email, address, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const recipientWithSameEmail = await this.recipientRepository.findByEmail(email);
        if (recipientWithSameEmail) {
            if (recipientWithSameEmail.address === address) {
                return (0, either_1.right)(recipientWithSameEmail);
            }
            return (0, either_1.left)(new user_already_exists_error_1.UserAlreadyExistsError('Recipient with the provided email exists but with a different address. Please verify the email and address provided.'));
        }
        const recipient = recipient_1.Recipient.create({
            name,
            email,
            address,
        });
        await this.recipientRepository.create(recipient);
        return (0, either_1.right)(recipient);
    }
}
exports.RegisterRecipientUseCase = RegisterRecipientUseCase;
//# sourceMappingURL=register-recipient.js.map