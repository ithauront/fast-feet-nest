import { UniqueEntityId } from './unique-entity-id';
export interface BasicEntityProps {
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Entity<Props extends BasicEntityProps> {
    private _id;
    props: Props;
    get id(): UniqueEntityId;
    get createdAt(): Date;
    get updatedAt(): Date;
    protected constructor(props: Props, id?: UniqueEntityId);
    equals(entity: Entity<BasicEntityProps>): boolean;
    protected touch(): void;
}
