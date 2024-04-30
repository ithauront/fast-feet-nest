"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
class UserNotFoundError extends Error {
    constructor(message = 'User not found.') {
        super(message);
    }
}
exports.UserNotFoundError = UserNotFoundError;
//# sourceMappingURL=user-not-found-error.js.map