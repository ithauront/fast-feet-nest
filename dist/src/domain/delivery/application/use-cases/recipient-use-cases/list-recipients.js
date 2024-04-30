"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListRecipientsUseCase = void 0;
const either_1 = require("../../../../../core/either");
class ListRecipientsUseCase {
    constructor(recipientRepository, authorizationService) {
        this.recipientRepository = recipientRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, page, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const recipients = await this.recipientRepository.findMany({ page });
        return (0, either_1.right)({ recipients });
    }
}
exports.ListRecipientsUseCase = ListRecipientsUseCase;
//# sourceMappingURL=list-recipients.js.map