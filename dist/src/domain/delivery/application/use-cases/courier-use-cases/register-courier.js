"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterCourierUseCase = void 0;
const either_1 = require("../../../../../core/either");
const courier_1 = require("../../../enterprise/entities/courier");
const geolocation_1 = require("../../../enterprise/entities/value-object/geolocation");
const user_already_exists_error_1 = require("../errors/user-already-exists-error");
class RegisterCourierUseCase {
    constructor(courierRepository, hashGenerator, authorizationService) {
        this.courierRepository = courierRepository;
        this.hashGenerator = hashGenerator;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, name, email, password, cpf, phone, isAdmin, location, status, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const courierWithSameEmail = await this.courierRepository.findByEmail(email);
        if (courierWithSameEmail) {
            return (0, either_1.left)(new user_already_exists_error_1.UserAlreadyExistsError());
        }
        const hashedPassword = await this.hashGenerator.hash(password);
        const courier = courier_1.Courier.create({
            name,
            email,
            cpf,
            password: hashedPassword,
            phone,
            isAdmin,
            location: location
                ? new geolocation_1.GeoLocation(location.latitude, location.longitude)
                : null,
            status,
        });
        await this.courierRepository.create(courier);
        return (0, either_1.right)(courier);
    }
}
exports.RegisterCourierUseCase = RegisterCourierUseCase;
//# sourceMappingURL=register-courier.js.map