"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCourierPackageItemAwaitingPickupUseCase = void 0;
const either_1 = require("../../../../../core/either");
const package_item_1 = require("../../../enterprise/entities/package-item");
class ListCourierPackageItemAwaitingPickupUseCase {
    constructor(packageItemRepository, authorizationService) {
        this.packageItemRepository = packageItemRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, courierId, page, }) {
        if (courierId !== creatorId) {
            const authorizationResult = await this.authorizationService.authorize(creatorId);
            if (authorizationResult?.isLeft()) {
                return (0, either_1.left)(authorizationResult.value);
            }
        }
        const queryParams = {
            page,
            status: package_item_1.PackageStatus.AWAITING_PICKUP,
        };
        const courierPackageItemsAwaitingPickup = await this.packageItemRepository.findManyByParamsAndCourierId(queryParams, courierId);
        return (0, either_1.right)({ packageItems: courierPackageItemsAwaitingPickup });
    }
}
exports.ListCourierPackageItemAwaitingPickupUseCase = ListCourierPackageItemAwaitingPickupUseCase;
//# sourceMappingURL=list-courier-package-items-awaiting-pickup.js.map