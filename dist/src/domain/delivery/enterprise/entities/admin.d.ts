import { BasicEntityProps, Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
import { HashComparer } from '../../application/cryptography/hash-comparer';
export interface AdminProps extends BasicEntityProps {
    name: string;
    email: string;
    cpf: string;
    password: string;
    isActive: boolean;
}
export declare class Admin extends Entity<AdminProps> {
    static create(props: Optional<AdminProps, 'isActive'>, id?: UniqueEntityId): Admin;
    get name(): string;
    get email(): string;
    get cpf(): string;
    get isAdmin(): boolean;
    set password(hashedPassword: string);
    verifyPassword(inputPassword: string, hashComparer: HashComparer): Promise<boolean>;
    set isActive(isActive: boolean);
    get isActive(): boolean;
}
