"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordUseCase = void 0;
const either_1 = require("../../../../core/either");
const admin_1 = require("../../enterprise/entities/admin");
const invalid_credentials_error_1 = require("./errors/invalid-credentials-error");
const token_expired_error_1 = require("./errors/token-expired-error");
class ChangePasswordUseCase {
    constructor(courierRepository, adminRepository, encrypter, hashGenerator) {
        this.courierRepository = courierRepository;
        this.adminRepository = adminRepository;
        this.encrypter = encrypter;
        this.hashGenerator = hashGenerator;
    }
    async execute({ uniqueAccessToken, newPassword, }) {
        let payload;
        try {
            payload = await this.encrypter.decrypt(uniqueAccessToken);
        }
        catch (error) {
            return (0, either_1.left)(new invalid_credentials_error_1.InvalidCredentialsError());
        }
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp < currentTime) {
            return (0, either_1.left)(new token_expired_error_1.TokenExpiredError());
        }
        let user = await this.courierRepository.findById(payload.sub);
        if (!user) {
            user = await this.adminRepository.findById(payload.sub);
        }
        if (!user) {
            return (0, either_1.left)(new invalid_credentials_error_1.InvalidCredentialsError());
        }
        const hashedPassword = await this.hashGenerator.hash(newPassword);
        user.password = hashedPassword;
        if (user instanceof admin_1.Admin) {
            await this.adminRepository.save(user);
        }
        else {
            await this.courierRepository.save(user);
        }
        return (0, either_1.right)({ message: 'Password changed successfully' });
    }
}
exports.ChangePasswordUseCase = ChangePasswordUseCase;
//# sourceMappingURL=change-password.js.map