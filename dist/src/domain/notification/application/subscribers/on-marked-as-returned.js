"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnMarkedAsReturned = void 0;
const domain_events_1 = require("../../../../core/events/domain-events");
const package_item_status_change_1 = require("../../../delivery/enterprise/events/package-item-status-change");
class OnMarkedAsReturned {
    constructor(sendNotification) {
        this.sendNotification = sendNotification;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.sendMarkAsReturnedNotification.bind(this), package_item_status_change_1.PackageItemStatusChangeEvent.name);
    }
    async sendMarkAsReturnedNotification({ packageItem, }) {
        await this.sendNotification.execute({
            recipientId: packageItem.recipientId.toString(),
            title: 'Change status in your package',
            content: `Your package is now ${packageItem.status}`,
        });
    }
}
exports.OnMarkedAsReturned = OnMarkedAsReturned;
//# sourceMappingURL=on-marked-as-returned.js.map