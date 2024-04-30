"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnMarkedAsInTransit = void 0;
const domain_events_1 = require("../../../../core/events/domain-events");
const package_item_status_change_1 = require("../../../delivery/enterprise/events/package-item-status-change");
class OnMarkedAsInTransit {
    constructor(sendNotification) {
        this.sendNotification = sendNotification;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.sendMarkAsInTransitNotification.bind(this), package_item_status_change_1.PackageItemStatusChangeEvent.name);
    }
    async sendMarkAsInTransitNotification({ packageItem, }) {
        await this.sendNotification.execute({
            recipientId: packageItem.recipientId.toString(),
            title: 'Change status in your package',
            content: `Your package is now ${packageItem.status}`,
        });
    }
}
exports.OnMarkedAsInTransit = OnMarkedAsInTransit;
//# sourceMappingURL=on-marked-as-in-transit.js.map