"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticateUseCase = void 0;
const either_1 = require("../../../../core/either");
const courier_1 = require("../../enterprise/entities/courier");
const invalid_credentials_error_1 = require("./errors/invalid-credentials-error");
const invalid_action_error_1 = require("./errors/invalid-action-error");
class AutenticateUseCase {
    constructor(courierRepository, hashComparer, encrypter, adminRepository) {
        this.courierRepository = courierRepository;
        this.hashComparer = hashComparer;
        this.encrypter = encrypter;
        this.adminRepository = adminRepository;
    }
    async execute({ cpf, password, }) {
        let user = await this.courierRepository.findByCpf(cpf);
        if (!user) {
            user = await this.adminRepository.findByCpf(cpf);
        }
        if (!user) {
            user = await this.adminRepository.findByCpf(cpf);
        }
        if (!user) {
            return (0, either_1.left)(new invalid_credentials_error_1.InvalidCredentialsError());
        }
        if (!(await user.verifyPassword(password, this.hashComparer))) {
            return (0, either_1.left)(new invalid_credentials_error_1.InvalidCredentialsError());
        }
        const isActive = user instanceof courier_1.Courier
            ? user.status === courier_1.CourierStatus.ACTIVE
            : user.isActive;
        if (!isActive) {
            return (0, either_1.left)(new invalid_action_error_1.InvalidActionError('User is not active'));
        }
        const accessToken = await this.encrypter.encrypt({
            sub: user.id.toString(),
        }, '1h');
        return (0, either_1.right)({ accessToken });
    }
}
exports.AutenticateUseCase = AutenticateUseCase;
//# sourceMappingURL=autenticate.js.map