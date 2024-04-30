"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkPackageItemAsLostUseCase = void 0;
const either_1 = require("../../../../../core/either");
const package_item_not_found_error_1 = require("../errors/package-item-not-found-error");
const unique_entity_id_1 = require("../../../../../core/entities/unique-entity-id");
class MarkPackageItemAsLostUseCase {
    constructor(packageItemRepository, authorizationService) {
        this.packageItemRepository = packageItemRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, packageItemId, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const packageItem = await this.packageItemRepository.findById(packageItemId);
        if (!packageItem) {
            return (0, either_1.left)(new package_item_not_found_error_1.PackageItemNotFoundError());
        }
        packageItem.markAsLost(new unique_entity_id_1.UniqueEntityId(creatorId));
        await this.packageItemRepository.save(packageItem);
        return (0, either_1.right)(packageItem);
    }
}
exports.MarkPackageItemAsLostUseCase = MarkPackageItemAsLostUseCase;
//# sourceMappingURL=mark-package-item-as-lost.js.map