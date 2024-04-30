"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCourierPackageItemDeliveredUseCase = void 0;
const either_1 = require("../../../../../core/either");
const package_item_1 = require("../../../enterprise/entities/package-item");
class ListCourierPackageItemDeliveredUseCase {
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
            status: package_item_1.PackageStatus.DELIVERED,
        };
        const courierPackageItemsDelivered = await this.packageItemRepository.findManyByParamsAndCourierId(queryParams, courierId);
        return (0, either_1.right)({ packageItems: courierPackageItemsDelivered });
    }
}
exports.ListCourierPackageItemDeliveredUseCase = ListCourierPackageItemDeliveredUseCase;
//# sourceMappingURL=list-courier-package-items-delivered.js.map