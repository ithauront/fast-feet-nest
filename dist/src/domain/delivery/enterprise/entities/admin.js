"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const entity_1 = require("../../../../core/entities/entity");
class Admin extends entity_1.Entity {
    static create(props, id) {
        const admin = new Admin({ ...props, isActive: props.isActive ?? true }, id);
        return admin;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
    }
    get cpf() {
        return this.props.cpf;
    }
    get isAdmin() {
        return true;
    }
    set password(hashedPassword) {
        this.props.password = hashedPassword;
        this.touch();
    }
    verifyPassword(inputPassword, hashComparer) {
        return hashComparer.compare(inputPassword, this.props.password);
    }
    set isActive(isActive) {
        this.props.isActive = isActive;
        this.touch();
    }
    get isActive() {
        return this.props.isActive;
    }
}
exports.Admin = Admin;
//# sourceMappingURL=admin.js.map