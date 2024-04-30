"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnPackageItemStatusChangeLog = void 0;
const domain_events_1 = require("../../../../../core/events/domain-events");
const package_item_status_change_1 = require("../../events/package-item-status-change");
const unique_entity_id_1 = require("../../../../../core/entities/unique-entity-id");
const logEntry_1 = require("../logEntry");
class OnPackageItemStatusChangeLog {
    constructor(logsRepository) {
        this.logsRepository = logsRepository;
        this.setupSubscriptions();
    }
    setupSubscriptions() {
        domain_events_1.DomainEvents.register(this.packageItemStatusChangeLog.bind(this), package_item_status_change_1.PackageItemStatusChangeEvent.name);
    }
    async packageItemStatusChangeLog(event) {
        const logEntry = new logEntry_1.LogEntry(new unique_entity_id_1.UniqueEntityId(), event.packageItem.id, event.previousStatus, event.packageItem.status, event.changedBy, event.ocurredAt);
        await this.logsRepository.create(logEntry);
    }
}
exports.OnPackageItemStatusChangeLog = OnPackageItemStatusChangeLog;
//# sourceMappingURL=on-package-item-status-change-log.js.map