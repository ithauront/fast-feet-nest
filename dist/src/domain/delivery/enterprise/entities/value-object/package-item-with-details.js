"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageItemWithDetails = void 0;
const value_object_1 = require("../../../../../core/entities/value-object");
class PackageItemWithDetails extends value_object_1.ValueObject {
    get packageItemId() {
        return this.props.packageItemId;
    }
    get courierId() {
        return this.props.courierId;
    }
    get recipientId() {
        return this.props.recipientId;
    }
    get deliveryAddress() {
        return this.props.deliveryAddress;
    }
    get title() {
        return this.props.title;
    }
    get status() {
        return this.props.status;
    }
    get attachments() {
        return this.props.attachments;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    static create(props) {
        return new PackageItemWithDetails(props);
    }
}
exports.PackageItemWithDetails = PackageItemWithDetails;
//# sourceMappingURL=package-item-with-details.js.map