"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageItemStatusChangeEvent = void 0;
class PackageItemStatusChangeEvent {
    constructor(packageItem, changedBy, previousStatus) {
        this.packageItem = packageItem;
        this.ocurredAt = new Date();
        this.changedBy = changedBy;
        this.previousStatus = previousStatus;
    }
    getAggregateId() {
        return this.packageItem.id;
    }
}
exports.PackageItemStatusChangeEvent = PackageItemStatusChangeEvent;
//# sourceMappingURL=package-item-status-change.js.map