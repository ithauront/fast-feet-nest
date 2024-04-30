"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntry = void 0;
class LogEntry {
    constructor(id, packageItemId, previousState, newState, changedBy, changedAt = new Date()) {
        this.id = id;
        this.packageItemId = packageItemId;
        this.previousState = previousState;
        this.newState = newState;
        this.changedBy = changedBy;
        this.changedAt = changedAt;
    }
}
exports.LogEntry = LogEntry;
//# sourceMappingURL=logEntry.js.map