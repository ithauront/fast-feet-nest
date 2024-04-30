"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Courier = exports.CourierStatus = void 0;
const entity_1 = require("../../../../core/entities/entity");
const geolocation_1 = require("./value-object/geolocation");
var CourierStatus;
(function (CourierStatus) {
    CourierStatus["ACTIVE"] = "ACTIVE";
    CourierStatus["INACTIVE"] = "INACTIVE";
    CourierStatus["ON_VACATION"] = "ON_VACATION";
    CourierStatus["DISMISSED"] = "DISMISSED";
})(CourierStatus || (exports.CourierStatus = CourierStatus = {}));
class Courier extends entity_1.Entity {
    static create(props, id) {
        const courier = new Courier({
            ...props,
            isAdmin: props.isAdmin ?? false,
            status: props.status ?? CourierStatus.ACTIVE,
        }, id);
        return courier;
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
    setLocation(latitude, longitude) {
        this.props.location = new geolocation_1.GeoLocation(latitude, longitude);
        this.touch();
    }
    get location() {
        return this.props.location ?? null;
    }
    set isAdmin(isAdmin) {
        this.props.isAdmin = isAdmin;
        this.touch();
    }
    get isAdmin() {
        return this.props.isAdmin;
    }
    get status() {
        return this.props.status;
    }
    set phone(newPhone) {
        this.props.phone = newPhone;
        this.touch();
    }
    get phone() {
        return this.props.phone;
    }
    set password(hashedPassword) {
        this.props.password = hashedPassword;
        this.touch();
    }
    verifyPassword(inputPassword, hashComparer) {
        return hashComparer.compare(inputPassword, this.props.password);
    }
    markAsActive() {
        this.props.status = CourierStatus.ACTIVE;
        this.touch();
    }
    markAsInactive() {
        this.props.status = CourierStatus.INACTIVE;
        this.touch();
    }
    markAsOnVacation() {
        this.props.status = CourierStatus.ON_VACATION;
        this.touch();
    }
    markAsDismissed() {
        this.props.status = CourierStatus.DISMISSED;
        this.touch();
    }
}
exports.Courier = Courier;
//# sourceMappingURL=courier.js.map