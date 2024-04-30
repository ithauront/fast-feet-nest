"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidActionError = void 0;
class InvalidActionError extends Error {
    constructor(message = 'This action cannot be done') {
        super(message);
    }
}
exports.InvalidActionError = InvalidActionError;
//# sourceMappingURL=invalid-action-error.js.map