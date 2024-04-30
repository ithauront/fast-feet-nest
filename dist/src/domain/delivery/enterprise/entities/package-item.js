"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageItem = exports.PackageStatus = void 0;
const aggregated_root_1 = require("../../../../core/entities/aggregated-root");
const package_item_attachment_list_1 = require("./package-item-attachment-list");
const package_item_status_change_1 = require("../events/package-item-status-change");
var PackageStatus;
(function (PackageStatus) {
    PackageStatus["AWAITING_PICKUP"] = "Awaiting Pickup";
    PackageStatus["IN_TRANSIT"] = "In Transit";
    PackageStatus["DELIVERED"] = "Delivered";
    PackageStatus["RETURNED"] = "Returned";
    PackageStatus["LOST"] = "Lost";
})(PackageStatus || (exports.PackageStatus = PackageStatus = {}));
class PackageItem extends aggregated_root_1.AggregateRoot {
    static create(props, id) {
        const packageItem = new PackageItem({
            ...props,
            status: props.status ?? PackageStatus.AWAITING_PICKUP,
            courierId: props.courierId ?? null,
            attachment: props.attachment ?? new package_item_attachment_list_1.PackageItemAttachmentList(),
        }, id);
        return packageItem;
    }
    get title() {
        return this.props.title;
    }
    get deliveryAddress() {
        return this.props.deliveryAddress;
    }
    set courierId(newCourier) {
        this.props.courierId = newCourier;
        this.touch();
    }
    get courierId() {
        return this.props.courierId ?? null;
    }
    get recipientId() {
        return this.props.recipientId;
    }
    get status() {
        return this.props.status;
    }
    get attachment() {
        return this.props.attachment;
    }
    set attachment(attachment) {
        this.props.attachment = attachment;
    }
    markAsInTransit(modifiedBy) {
        const previousStatus = this.props.status;
        this.props.status = PackageStatus.IN_TRANSIT;
        this.addDomainEvent(new package_item_status_change_1.PackageItemStatusChangeEvent(this, modifiedBy, previousStatus));
        this.touch();
    }
    markAsDelivered(modifiedBy) {
        const previousStatus = this.props.status;
        this.props.status = PackageStatus.DELIVERED;
        this.addDomainEvent(new package_item_status_change_1.PackageItemStatusChangeEvent(this, modifiedBy, previousStatus));
        this.touch();
    }
    markAsReturned(modifiedBy) {
        const previousStatus = this.props.status;
        this.props.status = PackageStatus.RETURNED;
        this.addDomainEvent(new package_item_status_change_1.PackageItemStatusChangeEvent(this, modifiedBy, previousStatus));
        this.touch();
    }
    markAsLost(modifiedBy) {
        const previousStatus = this.props.status;
        this.props.status = PackageStatus.LOST;
        this.addDomainEvent(new package_item_status_change_1.PackageItemStatusChangeEvent(this, modifiedBy, previousStatus));
        this.touch();
    }
}
exports.PackageItem = PackageItem;
//# sourceMappingURL=package-item.js.map