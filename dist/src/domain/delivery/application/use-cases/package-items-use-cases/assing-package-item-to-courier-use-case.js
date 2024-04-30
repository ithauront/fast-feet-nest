"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssingPackageItemToCourierUseCase = void 0;
const either_1 = require("../../../../../core/either");
const package_item_not_found_error_1 = require("../errors/package-item-not-found-error");
const unique_entity_id_1 = require("../../../../../core/entities/unique-entity-id");
class AssingPackageItemToCourierUseCase {
    constructor(packageItemRepository, authorizationService) {
        this.packageItemRepository = packageItemRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, packageId, courierId, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const packageItem = await this.packageItemRepository.findById(packageId);
        if (!packageItem) {
            return (0, either_1.left)(new package_item_not_found_error_1.PackageItemNotFoundError());
        }
        packageItem.courierId = new unique_entity_id_1.UniqueEntityId(courierId);
        return (0, either_1.right)(packageItem);
    }
}
exports.AssingPackageItemToCourierUseCase = AssingPackageItemToCourierUseCase;
//# sourceMappingURL=assing-package-item-to-courier-use-case.js.map