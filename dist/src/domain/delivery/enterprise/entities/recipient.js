"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipient = void 0;
const entity_1 = require("../../../../core/entities/entity");
class Recipient extends entity_1.Entity {
    static create(props, id) {
        const recipient = new Recipient(props, id);
        return recipient;
    }
    get name() {
        return this.props.name;
    }
    set email(newEmail) {
        this.props.email = newEmail;
        this.touch();
    }
    get email() {
        return this.props.email;
    }
    set address(newAddress) {
        this.props.address = newAddress;
        this.touch();
    }
    get address() {
        return this.props.address;
    }
}
exports.Recipient = Recipient;
//# sourceMappingURL=recipient.js.map