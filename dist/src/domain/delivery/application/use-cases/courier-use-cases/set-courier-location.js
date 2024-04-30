"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetCourierLocationUseCase = void 0;
const either_1 = require("../../../../../core/either");
const user_not_found_error_1 = require("../errors/user-not-found-error");
class SetCourierLocationUseCase {
    constructor(courierRepository, geoLocationProvider) {
        this.courierRepository = courierRepository;
        this.geoLocationProvider = geoLocationProvider;
    }
    async execute({ creatorId, ip, }) {
        const courier = await this.courierRepository.findById(creatorId);
        if (!courier) {
            return (0, either_1.left)(new user_not_found_error_1.UserNotFoundError());
        }
        const geoLocation = await this.geoLocationProvider.getGeoLocationFromIp(ip);
        courier.setLocation(geoLocation.latitude, geoLocation.longitude);
        await this.courierRepository.save(courier);
        return (0, either_1.right)(courier);
    }
}
exports.SetCourierLocationUseCase = SetCourierLocationUseCase;
//# sourceMappingURL=set-courier-location.js.map