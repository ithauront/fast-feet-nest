"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkPackageItemAsDeliveredUseCase = void 0;
const either_1 = require("../../../../../core/either");
const unauthorized_admin_error_1 = require("../errors/unauthorized-admin-error");
const package_item_not_found_error_1 = require("../errors/package-item-not-found-error");
const unique_entity_id_1 = require("../../../../../core/entities/unique-entity-id");
const invalid_action_error_1 = require("../errors/invalid-action-error");
const package_item_attachment_1 = require("../../../enterprise/entities/package-item-attachment");
const package_item_attachment_list_1 = require("../../../enterprise/entities/package-item-attachment-list");
class MarkPackageItemAsDeliveredUseCase {
    constructor(packageItemRepository) {
        this.packageItemRepository = packageItemRepository;
    }
    async execute({ creatorId, packageItemId, attachmentIds, }) {
        const packageItem = await this.packageItemRepository.findById(packageItemId);
        if (!packageItem) {
            return (0, either_1.left)(new package_item_not_found_error_1.PackageItemNotFoundError());
        }
        if (packageItem.courierId?.toString() !== creatorId) {
            return (0, either_1.left)(new unauthorized_admin_error_1.UnauthorizedAdminError('Only the courier assigned to the package item can mark it as delivered'));
        }
        if (attachmentIds.length === 0) {
            return (0, either_1.left)(new invalid_action_error_1.InvalidActionError('At least one attachment must be provided when marking the package as delivered'));
        }
        const packageItemAttachment = attachmentIds.map((attachmentId) => {
            return package_item_attachment_1.PackageItemAttachment.create({
                packageItemId: packageItem.id,
                attachmentId: new unique_entity_id_1.UniqueEntityId(attachmentId),
                isImmutable: true,
            });
        });
        packageItem.attachment = new package_item_attachment_list_1.PackageItemAttachmentList(packageItemAttachment);
        packageItem.markAsDelivered(new unique_entity_id_1.UniqueEntityId(creatorId));
        await this.packageItemRepository.save(packageItem);
        return (0, either_1.right)(packageItem);
    }
}
exports.MarkPackageItemAsDeliveredUseCase = MarkPackageItemAsDeliveredUseCase;
//# sourceMappingURL=mark-package-item-as-delivered.js.map