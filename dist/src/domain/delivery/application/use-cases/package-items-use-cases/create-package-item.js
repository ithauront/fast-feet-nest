"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePackageItemUseCase = void 0;
const unique_entity_id_1 = require("../../../../../core/entities/unique-entity-id");
const package_item_1 = require("../../../enterprise/entities/package-item");
const either_1 = require("../../../../../core/either");
class CreatePackageItemUseCase {
    constructor(packageItemRepository, authorizationService) {
        this.packageItemRepository = packageItemRepository;
        this.authorizationService = authorizationService;
    }
    async execute({ creatorId, title, deliveryAddress, recipientId, courierId, }) {
        const authorizationResult = await this.authorizationService.authorize(creatorId);
        if (authorizationResult?.isLeft()) {
            return (0, either_1.left)(authorizationResult.value);
        }
        const optionalCourierId = courierId ? new unique_entity_id_1.UniqueEntityId(courierId) : null;
        const packageItem = package_item_1.PackageItem.create({
            title,
            deliveryAddress,
            recipientId: new unique_entity_id_1.UniqueEntityId(recipientId),
            courierId: optionalCourierId,
        });
        await this.packageItemRepository.create(packageItem);
        return (0, either_1.right)(packageItem);
    }
}
exports.CreatePackageItemUseCase = CreatePackageItemUseCase;
//# sourceMappingURL=create-package-item.js.map