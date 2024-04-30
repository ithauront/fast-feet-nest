"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
class ValueObject {
    constructor(props) {
        this.props = props;
    }
    equals(valueObject) {
        if (valueObject === null || valueObject === undefined) {
            return false;
        }
        if (valueObject.props === undefined) {
            return false;
        }
        return JSON.stringify(valueObject.props) === JSON.stringify(this.props);
    }
}
exports.ValueObject = ValueObject;
//# sourceMappingURL=value-object.js.map