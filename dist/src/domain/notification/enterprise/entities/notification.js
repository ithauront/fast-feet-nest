"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
const entity_1 = require("../../../../core/entities/entity");
class Notification extends entity_1.Entity {
    get recipientId() {
        return this.props.recipientId;
    }
    get title() {
        return this.props.title;
    }
    get content() {
        return this.props.content;
    }
    get readAt() {
        return this.props.readAt;
    }
    read() {
        this.props.readAt = new Date();
        this.touch();
    }
    static create(props, id) {
        const notification = new Notification({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id);
        return notification;
    }
}
exports.Notification = Notification;
//# sourceMappingURL=notification.js.map