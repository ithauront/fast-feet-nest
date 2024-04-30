export declare class UniqueEntityId {
    private value;
    toString(): string;
    toValue(): string;
    constructor(value?: string);
    equals(id: UniqueEntityId): boolean;
}
