"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkAdminAsInactiveUseCase = void 0;
const either_1 = require("../../../../../core/either");
const user_not_found_error_1 = require("../errors/user-not-found-error");
class MarkAdminAsInactiveUseCase {
    constructor(adminRepository, authorizationService) {
        this.adminRepository = adminRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, adminId, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const admin = await this.adminRepository.findById(adminId);
        if (!admin) {
            return (0, either_1.left)(new user_not_found_error_1.UserNotFoundError());
        }
        admin.isActive = false;
        await this.adminRepository.save(admin);
        return (0, either_1.right)(admin);
    }
}
exports.MarkAdminAsInactiveUseCase = MarkAdminAsInactiveUseCase;
//# sourceMappingURL=mark-admin-as-inactive.js.map