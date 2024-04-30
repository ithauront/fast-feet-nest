"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPackageItemsNearCourierUseCase = void 0;
const either_1 = require("../../../../../core/either");
const package_item_1 = require("../../../enterprise/entities/package-item");
const user_not_found_error_1 = require("../errors/user-not-found-error");
class ListPackageItemsNearCourierUseCase {
    constructor(packageItemRepository, courierRepository, geoLocationProvider, authorizationService) {
        this.packageItemRepository = packageItemRepository;
        this.courierRepository = courierRepository;
        this.geoLocationProvider = geoLocationProvider;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, courierId, page, }) {
        if (courierId !== creatorId) {
            const authorizationResult = await this.authorizationService.authorize(creatorId);
            if (authorizationResult?.isLeft()) {
                return (0, either_1.left)(authorizationResult.value);
            }
        }
        const courier = await this.courierRepository.findById(courierId);
        if (!courier || !courier.location) {
            return (0, either_1.left)(new user_not_found_error_1.UserNotFoundError('Courier location not available'));
        }
        const queryParams = { page, status: package_item_1.PackageStatus.IN_TRANSIT };
        const courierPackageItems = await this.packageItemRepository.findManyByParamsAndCourierId(queryParams, courierId);
        const distances = await Promise.all(courierPackageItems.map((item) => this.geoLocationProvider
            .getGeoLocationFromAddress(item.deliveryAddress)
            .then((location) => courier.location.getDistanceTo(location))));
        const packageItemsWithDistances = courierPackageItems.map((item, index) => ({
            item,
            distance: distances[index],
        }));
        const packageItemsNearCourierSorted = packageItemsWithDistances
            .filter(({ distance }) => distance < 5)
            .sort((a, b) => a.distance - b.distance)
            .map(({ item }) => item);
        return (0, either_1.right)({ packageItems: packageItemsNearCourierSorted });
    }
}
exports.ListPackageItemsNearCourierUseCase = ListPackageItemsNearCourierUseCase;
//# sourceMappingURL=list-package-items-near-courier.js.map