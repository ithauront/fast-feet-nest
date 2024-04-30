"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadNotificationUseCase = void 0;
const either_1 = require("../../../../core/either");
const unauthorized_error_1 = require("../../../../core/error/errors/unauthorized-error");
const Resource_not_found_error_1 = require("../../../../core/error/errors/Resource-not-found-error");
class ReadNotificationUseCase {
    constructor(notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    async execute({ notificationId, recipientId, }) {
        const notification = await this.notificationRepository.findById(notificationId);
        if (!notification) {
            return (0, either_1.left)(new Resource_not_found_error_1.ResourceNotFoundError());
        }
        if (recipientId !== notification.recipientId.toString()) {
            return (0, either_1.left)(new unauthorized_error_1.UnauthorizedError());
        }
        notification.read();
        await this.notificationRepository.save(notification);
        return (0, either_1.right)({ notification });
    }
}
exports.ReadNotificationUseCase = ReadNotificationUseCase;
//# sourceMappingURL=read-notification.js.map