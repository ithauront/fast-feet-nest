"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkAdminAsActiveUseCase = void 0;
const either_1 = require("../../../../../core/either");
const user_not_found_error_1 = require("../errors/user-not-found-error");
const invalid_action_error_1 = require("../errors/invalid-action-error");
class MarkAdminAsActiveUseCase {
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
        if (admin.id.toString() === '01') {
            return (0, either_1.left)(new invalid_action_error_1.InvalidActionError('The initial admin cannot be reactivated.'));
        }
        admin.isActive = true;
        await this.adminRepository.save(admin);
        return (0, either_1.right)(admin);
    }
}
exports.MarkAdminAsActiveUseCase = MarkAdminAsActiveUseCase;
//# sourceMappingURL=mark-admin-as-active.js.map