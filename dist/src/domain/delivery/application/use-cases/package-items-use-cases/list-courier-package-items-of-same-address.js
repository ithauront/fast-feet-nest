"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCourierPackageItemsOfSameAddressUseCase = void 0;
const either_1 = require("../../../../../core/either");
const package_item_1 = require("../../../enterprise/entities/package-item");
class ListCourierPackageItemsOfSameAddressUseCase {
    constructor(packageItemRepository, authorizationService) {
        this.packageItemRepository = packageItemRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, courierId, page, address, }) {
        if (courierId !== creatorId) {
            const authorizationResult = await this.authorizationService.authorize(creatorId);
            if (authorizationResult?.isLeft()) {
                return (0, either_1.left)(authorizationResult.value);
            }
        }
        const queryParams = {
            page,
            status: package_item_1.PackageStatus.IN_TRANSIT,
            address,
        };
        const courierPackageItems = await this.packageItemRepository.findManyByParamsAndCourierId(queryParams, courierId);
        return (0, either_1.right)({ packageItems: courierPackageItems });
    }
}
exports.ListCourierPackageItemsOfSameAddressUseCase = ListCourierPackageItemsOfSameAddressUseCase;
//# sourceMappingURL=list-courier-package-items-of-same-address.js.map