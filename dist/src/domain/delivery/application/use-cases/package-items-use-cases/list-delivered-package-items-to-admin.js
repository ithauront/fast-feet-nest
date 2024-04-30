"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDeliveredPackageItemToAdminUseCase = void 0;
const either_1 = require("../../../../../core/either");
const package_item_1 = require("../../../enterprise/entities/package-item");
class ListDeliveredPackageItemToAdminUseCase {
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
            status: package_item_1.PackageStatus.DELIVERED,
        };
        const courierPackageItemInTransit = await this.packageItemRepository.findManyByParams(queryParams);
        return (0, either_1.right)({ packageItems: courierPackageItemInTransit });
    }
}
exports.ListDeliveredPackageItemToAdminUseCase = ListDeliveredPackageItemToAdminUseCase;
//# sourceMappingURL=list-delivered-package-items-to-admin.js.map