"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterAdminUseCase = void 0;
const either_1 = require("../../../../../core/either");
const admin_1 = require("../../../enterprise/entities/admin");
const user_already_exists_error_1 = require("../errors/user-already-exists-error");
class RegisterAdminUseCase {
    constructor(adminRepository, hashGenerator, authorizationService) {
        this.adminRepository = adminRepository;
        this.hashGenerator = hashGenerator;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, name, email, password, cpf, isActive, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const adminWithSameEmail = await this.adminRepository.findByEmail(email);
        if (adminWithSameEmail) {
            return (0, either_1.left)(new user_already_exists_error_1.UserAlreadyExistsError());
        }
        const hashedPassword = await this.hashGenerator.hash(password);
        const admin = admin_1.Admin.create({
            name,
            email,
            cpf,
            password: hashedPassword,
            isActive,
        });
        await this.adminRepository.create(admin);
        return (0, either_1.right)(admin);
    }
}
exports.RegisterAdminUseCase = RegisterAdminUseCase;
//# sourceMappingURL=register-admin.js.map