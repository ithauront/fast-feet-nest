"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCourierUseCase = void 0;
const either_1 = require("../../../../../core/either");
class ListCourierUseCase {
    constructor(courierRepository, authorizationService) {
        this.courierRepository = courierRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, page, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const courier = await this.courierRepository.findMany({ page });
        return (0, either_1.right)({ courier });
    }
}
exports.ListCourierUseCase = ListCourierUseCase;
//# sourceMappingURL=list-courier.js.map