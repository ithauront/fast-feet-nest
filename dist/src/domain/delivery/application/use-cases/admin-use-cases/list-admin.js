"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAdminUseCase = void 0;
const either_1 = require("../../../../../core/either");
class ListAdminUseCase {
    constructor(adminRepository, authorizationService) {
        this.adminRepository = adminRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, page, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const admin = await this.adminRepository.findMany({ page });
        return (0, either_1.right)({ admin });
    }
}
exports.ListAdminUseCase = ListAdminUseCase;
//# sourceMappingURL=list-admin.js.map