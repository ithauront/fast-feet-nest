import { BasicEntityProps, Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
export interface RecipientProps extends BasicEntityProps {
    name: string;
    email: string;
    address: string;
}
export declare class Recipient extends Entity<RecipientProps> {
    static create(props: RecipientProps, id?: UniqueEntityId): Recipient;
    get name(): string;
    set email(newEmail: string);
    get email(): string;
    set address(newAddress: string);
    get address(): string;
}
