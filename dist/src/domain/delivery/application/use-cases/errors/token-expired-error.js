"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExpiredError = void 0;
class TokenExpiredError extends Error {
    constructor() {
        super('Token expired. Please create a new request');
    }
}
exports.TokenExpiredError = TokenExpiredError;
//# sourceMappingURL=token-expired-error.js.map