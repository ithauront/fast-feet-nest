"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageItemAttachment = void 0;
const entity_1 = require("../../../../core/entities/entity");
class PackageItemAttachment extends entity_1.Entity {
    get packageItemId() {
        return this.props.packageItemId;
    }
    get attachmentId() {
        return this.props.attachmentId;
    }
    get isImmutable() {
        return this.props.isImmutable || false;
    }
    static create(props, id) {
        const questionAttachment = new PackageItemAttachment({ ...props, isImmutable: props.isImmutable ?? false }, id);
        return questionAttachment;
    }
}
exports.PackageItemAttachment = PackageItemAttachment;
//# sourceMappingURL=package-item-attachment.js.map