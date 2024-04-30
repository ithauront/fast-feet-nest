"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordChangeUseCase = void 0;
const either_1 = require("../../../../core/either");
const invalid_credentials_error_1 = require("./errors/invalid-credentials-error");
const domain_events_1 = require("../../../../core/events/domain-events");
const request_password_change_1 = require("../../enterprise/events/request-password-change");
class RequestPasswordChangeUseCase {
    constructor(courierRepository, adminRepository, encrypter) {
        this.courierRepository = courierRepository;
        this.adminRepository = adminRepository;
        this.encrypter = encrypter;
    }
    async execute({ creatorId, userEmail, }) {
        let user = await this.courierRepository.findById(creatorId);
        if (!user) {
            user = await this.adminRepository.findById(creatorId);
        }
        if (!user) {
            return (0, either_1.left)(new invalid_credentials_error_1.InvalidCredentialsError());
        }
        if (user.email !== userEmail) {
            return (0, either_1.left)(new invalid_credentials_error_1.InvalidCredentialsError());
        }
        const expiresIn = '1h';
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = currentTime + 3600;
        const payload = {
            sub: user.id,
            exp: expirationTime,
        };
        const uniqueAccessToken = await this.encrypter.encrypt(payload, expiresIn);
        const event = new request_password_change_1.RequestPasswordChangeEvent(user.id, user.email, uniqueAccessToken);
        domain_events_1.DomainEvents.dispatch(event);
        return (0, either_1.right)({
            message: 'Password change email has been sent successfully',
        });
    }
}
exports.RequestPasswordChangeUseCase = RequestPasswordChangeUseCase;
//# sourceMappingURL=request-password-change.js.map