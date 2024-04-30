"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const unique_entity_id_1 = require("./unique-entity-id");
class Entity {
    get id() {
        return this._id;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    constructor(props, id) {
        this._id = id ?? new unique_entity_id_1.UniqueEntityId();
        this.props = { ...props, createdAt: props.createdAt ?? new Date() };
    }
    equals(entity) {
        if (entity === this) {
            return true;
        }
        if (entity._id === this._id) {
            return true;
        }
        return false;
    }
    touch() {
        this.props.updatedAt = new Date();
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map