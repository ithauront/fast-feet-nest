"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const entity_1 = require("../../../../core/entities/entity");
class Email extends entity_1.Entity {
    get recipientEmail() {
        return this.props.recipientEmail;
    }
    get subject() {
        return this.props.subject;
    }
    get body() {
        return this.props.body;
    }
    get sentAt() {
        return this.props.sentAt;
    }
    static create(props, id) {
        const email = new Email({
            ...props,
            sentAt: props.sentAt ?? new Date(),
        }, id);
        return email;
    }
}
exports.Email = Email;
//# sourceMappingURL=email.js.map