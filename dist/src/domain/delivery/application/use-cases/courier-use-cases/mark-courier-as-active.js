"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkCourierAsActiveUseCase = void 0;
const either_1 = require("../../../../../core/either");
const user_not_found_error_1 = require("../errors/user-not-found-error");
class MarkCourierAsActiveUseCase {
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
        courier.markAsActive();
        await this.courierRepository.save(courier);
        return (0, either_1.right)(courier);
    }
}
exports.MarkCourierAsActiveUseCase = MarkCourierAsActiveUseCase;
//# sourceMappingURL=mark-courier-as-active.js.map