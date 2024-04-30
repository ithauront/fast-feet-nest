"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAwaitingPickupPackageItemToAdminUseCase = void 0;
const either_1 = require("../../../../../core/either");
const package_item_1 = require("../../../enterprise/entities/package-item");
class ListAwaitingPickupPackageItemToAdminUseCase {
    constructor(packageItemRepository, authorizationService) {
        this.packageItemRepository = packageItemRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, page, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const queryParams = {
            page,
            status: package_item_1.PackageStatus.AWAITING_PICKUP,
        };
        const courierPackageItemInTransit = await this.packageItemRepository.findManyByParams(queryParams);
        return (0, either_1.right)({ packageItems: courierPackageItemInTransit });
    }
}
exports.ListAwaitingPickupPackageItemToAdminUseCase = ListAwaitingPickupPackageItemToAdminUseCase;
//# sourceMappingURL=list-awaiting-pickup-package-items-to-admin.js.map