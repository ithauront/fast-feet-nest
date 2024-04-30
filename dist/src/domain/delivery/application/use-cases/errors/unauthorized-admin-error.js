"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedAdminError = void 0;
class UnauthorizedAdminError extends Error {
    constructor(message = 'This action is only allowed to active admins') {
        super(message);
    }
}
exports.UnauthorizedAdminError = UnauthorizedAdminError;
//# sourceMappingURL=unauthorized-admin-error.js.map