import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { ValueObject } from '@/core/entities/value-object';
import { PackageStatus } from '../package-item';
import { Attachment } from '../attachment';
export interface PackageItemWithDetailsProps {
    packageItemId: UniqueEntityId;
    courierId: UniqueEntityId | null;
    recipientId: UniqueEntityId;
    deliveryAddress: string;
    title: string;
    status: PackageStatus;
    attachments: Attachment[];
    createdAt: Date;
    updatedAt?: Date | null;
}
export declare class PackageItemWithDetails extends ValueObject<PackageItemWithDetailsProps> {
    get packageItemId(): UniqueEntityId;
    get courierId(): UniqueEntityId;
    get recipientId(): UniqueEntityId;
    get deliveryAddress(): string;
    get title(): string;
    get status(): PackageStatus;
    get attachments(): Attachment[];
    get createdAt(): Date;
    get updatedAt(): Date;
    static create(props: PackageItemWithDetailsProps): PackageItemWithDetails;
}
