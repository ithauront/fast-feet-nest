"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkCourierAsDismissedUseCase = void 0;
const either_1 = require("../../../../../core/either");
const user_not_found_error_1 = require("../errors/user-not-found-error");
class MarkCourierAsDismissedUseCase {
    constructor(courierRepository, authorizationService) {
        this.courierRepository = courierRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, courierId, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const courier = await this.courierRepository.findById(courierId);
        if (!courier) {
            return (0, either_1.left)(new user_not_found_error_1.UserNotFoundError());
        }
        courier.markAsDismissed();
        await this.courierRepository.save(courier);
        return (0, either_1.right)(courier);
    }
}
exports.MarkCourierAsDismissedUseCase = MarkCourierAsDismissedUseCase;
//# sourceMappingURL=mark-courier-as-dismissed.js.map