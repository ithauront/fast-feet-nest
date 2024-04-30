"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPackageItemAttachmentUseCase = void 0;
const either_1 = require("../../../../../core/either");
const package_item_not_found_error_1 = require("../errors/package-item-not-found-error");
const unique_entity_id_1 = require("../../../../../core/entities/unique-entity-id");
const package_item_attachment_list_1 = require("../../../enterprise/entities/package-item-attachment-list");
const package_item_attachment_1 = require("../../../enterprise/entities/package-item-attachment");
const package_item_1 = require("../../../enterprise/entities/package-item");
class EditPackageItemAttachmentUseCase {
    constructor(packageItemRepository, packageItemAttachmentRepository) {
        this.packageItemRepository = packageItemRepository;
        this.packageItemAttachmentRepository = packageItemAttachmentRepository;
    }
    async execute({ packageItemId, attachmentIds, }) {
        const packageItem = await this.packageItemRepository.findById(packageItemId);
        if (!packageItem) {
            return (0, either_1.left)(new package_item_not_found_error_1.PackageItemNotFoundError());
        }
        if (packageItem.status !== package_item_1.PackageStatus.DELIVERED) {
            return (0, either_1.left)(new package_item_not_found_error_1.PackageItemNotFoundError('The package has not been delivered yet. Please wait until you have the package in your hands before uploading any feedback.'));
        }
        const currentPackageItemAttachments = await this.packageItemAttachmentRepository.findByPackageItemId(packageItemId);
        const packageItemAttachmentList = new package_item_attachment_list_1.PackageItemAttachmentList(currentPackageItemAttachments);
        const attachments = attachmentIds.map((attachmentId) => {
            return package_item_attachment_1.PackageItemAttachment.create({
                attachmentId: new unique_entity_id_1.UniqueEntityId(attachmentId),
                packageItemId: packageItem.id,
            });
        });
        packageItemAttachmentList.update(attachments);
        packageItem.attachment = packageItemAttachmentList;
        await this.packageItemRepository.save(packageItem);
        return (0, either_1.right)(packageItem);
    }
}
exports.EditPackageItemAttachmentUseCase = EditPackageItemAttachmentUseCase;
//# sourceMappingURL=edit-package-item-attachments.js.map