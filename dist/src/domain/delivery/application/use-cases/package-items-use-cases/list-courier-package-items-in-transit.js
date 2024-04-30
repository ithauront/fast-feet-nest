"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCourierPackageItemInTransitUseCase = void 0;
const either_1 = require("../../../../../core/either");
const package_item_1 = require("../../../enterprise/entities/package-item");
class ListCourierPackageItemInTransitUseCase {
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
            status: package_item_1.PackageStatus.IN_TRANSIT,
        };
        const courierPackageItemsInTransit = await this.packageItemRepository.findManyByParamsAndCourierId(queryParams, courierId);
        return (0, either_1.right)({ packageItems: courierPackageItemsInTransit });
    }
}
exports.ListCourierPackageItemInTransitUseCase = ListCourierPackageItemInTransitUseCase;
//# sourceMappingURL=list-courier-package-items-in-transit.js.map