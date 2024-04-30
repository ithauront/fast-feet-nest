import { BasicEntityProps, Entity } from '@/core/entities/entity';
import { Optional } from '@/core/types/optional';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { GeoLocation } from './value-object/geolocation';
import { HashComparer } from '../../application/cryptography/hash-comparer';
export declare enum CourierStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    ON_VACATION = "ON_VACATION",
    DISMISSED = "DISMISSED"
}
export interface CourierProps extends BasicEntityProps {
    name: string;
    email: string;
    cpf: string;
    password: string;
    location?: GeoLocation | null;
    isAdmin: boolean;
    status: CourierStatus;
    phone: string;
}
export declare class Courier extends Entity<CourierProps> {
    static create(props: Optional<CourierProps, 'isAdmin' | 'status'>, id?: UniqueEntityId): Courier;
    get name(): string;
    get email(): string;
    get cpf(): string;
    setLocation(latitude: number, longitude: number): void;
    get location(): GeoLocation | null;
    set isAdmin(isAdmin: boolean);
    get isAdmin(): boolean;
    get status(): CourierStatus;
    set phone(newPhone: string);
    get phone(): string;
    set password(hashedPassword: string);
    verifyPassword(inputPassword: string, hashComparer: HashComparer): Promise<boolean>;
    markAsActive(): void;
    markAsInactive(): void;
    markAsOnVacation(): void;
    markAsDismissed(): void;
}
