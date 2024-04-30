"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregateRoot = void 0;
const domain_events_1 = require("../events/domain-events");
const entity_1 = require("./entity");
class AggregateRoot extends entity_1.Entity {
    constructor() {
        super(...arguments);
        this._domaineEvents = [];
    }
    get domainEvents() {
        return this._domaineEvents;
    }
    addDomainEvent(domainEvent) {
        this._domaineEvents.push(domainEvent);
        domain_events_1.DomainEvents.markAggregateForDispatch(this);
    }
    clearEvents() {
        this._domaineEvents = [];
    }
}
exports.AggregateRoot = AggregateRoot;
//# sourceMappingURL=aggregated-root.js.map