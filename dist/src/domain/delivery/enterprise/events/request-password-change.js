"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordChangeEvent = void 0;
class RequestPasswordChangeEvent {
    constructor(userId, userEmail, accessToken) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.accessToken = accessToken;
        this.ocurredAt = new Date();
    }
    getAggregateId() {
        return this.userId;
    }
}
exports.RequestPasswordChangeEvent = RequestPasswordChangeEvent;
//# sourceMappingURL=request-password-change.js.map