"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = void 0;
const either_1 = require("../../../../core/either");
const unauthorized_admin_error_1 = require("../use-cases/errors/unauthorized-admin-error");
const not_found_or_unauthorized_error_1 = require("../use-cases/errors/not-found-or-unauthorized-error");
const courier_1 = require("../../enterprise/entities/courier");
class AuthorizationService {
    constructor(courierRepository, adminRepository) {
        this.courierRepository = courierRepository;
        this.adminRepository = adminRepository;
    }
    async authorize(creatorId) {
        const admin = await this.adminRepository.findById(creatorId);
        if (admin) {
            if (!admin.isActive) {
                return (0, either_1.left)(new unauthorized_admin_error_1.UnauthorizedAdminError());
            }
            return;
        }
        const courier = await this.courierRepository.findById(creatorId);
        if (courier) {
            if (!courier.isAdmin) {
                return (0, either_1.left)(new unauthorized_admin_error_1.UnauthorizedAdminError());
            }
            if (courier.status !== courier_1.CourierStatus.ACTIVE &&
                courier.status !== courier_1.CourierStatus.ON_VACATION) {
                return (0, either_1.left)(new unauthorized_admin_error_1.UnauthorizedAdminError());
            }
            return;
        }
        return (0, either_1.left)(new not_found_or_unauthorized_error_1.NotFoundOrUnauthorizedError());
    }
}
exports.AuthorizationService = AuthorizationService;
//# sourceMappingURL=authorization.js.map