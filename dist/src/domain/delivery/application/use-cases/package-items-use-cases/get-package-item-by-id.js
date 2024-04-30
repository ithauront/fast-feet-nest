"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPackageItemByIdUseCase = void 0;
const either_1 = require("../../../../../core/either");
const package_item_not_found_error_1 = require("../errors/package-item-not-found-error");
class GetPackageItemByIdUseCase {
    constructor(packageItemRepository, authorizationService) {
        this.packageItemRepository = packageItemRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, packageId, }) {
        const packageItem = await this.packageItemRepository.findPackageItemWithDetailsById(packageId);
        if (!packageItem) {
            return (0, either_1.left)(new package_item_not_found_error_1.PackageItemNotFoundError());
        }
        if (packageItem.courierId?.toString() === creatorId) {
            return (0, either_1.right)(packageItem);
        }
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        return (0, either_1.right)(packageItem);
    }
}
exports.GetPackageItemByIdUseCase = GetPackageItemByIdUseCase;
//# sourceMappingURL=get-package-item-by-id.js.map