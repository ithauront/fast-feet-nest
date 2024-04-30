"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundOrUnauthorizedError = void 0;
class NotFoundOrUnauthorizedError extends Error {
    constructor() {
        super('Creator not found or not authorized.');
    }
}
exports.NotFoundOrUnauthorizedError = NotFoundOrUnauthorizedError;
//# sourceMappingURL=not-found-or-unauthorized-error.js.map