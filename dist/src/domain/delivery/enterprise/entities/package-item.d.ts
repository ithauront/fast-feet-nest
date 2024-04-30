import { Optional } from '@/core/types/optional';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AggregateRoot } from '@/core/entities/aggregated-root';
import { PackageItemAttachmentList } from './package-item-attachment-list';
import { BasicEntityProps } from '@/core/entities/entity';
export declare enum PackageStatus {
    AWAITING_PICKUP = "Awaiting Pickup",
    IN_TRANSIT = "In Transit",
    DELIVERED = "Delivered",
    RETURNED = "Returned",
    LOST = "Lost"
}
export interface PackageItemProps extends BasicEntityProps {
    title: string;
    deliveryAddress: string;
    courierId?: UniqueEntityId | null;
    recipientId: UniqueEntityId;
    status: PackageStatus;
    attachment: PackageItemAttachmentList;
}
export declare class PackageItem extends AggregateRoot<PackageItemProps> {
    static create(props: Optional<PackageItemProps, 'courierId' | 'status' | 'attachment'>, id?: UniqueEntityId): PackageItem;
    get title(): string;
    get deliveryAddress(): string;
    set courierId(newCourier: UniqueEntityId);
    get courierId(): UniqueEntityId | null;
    get recipientId(): UniqueEntityId;
    get status(): PackageStatus;
    get attachment(): PackageItemAttachmentList;
    set attachment(attachment: PackageItemAttachmentList);
    markAsInTransit(modifiedBy: UniqueEntityId): void;
    markAsDelivered(modifiedBy: UniqueEntityId): void;
    markAsReturned(modifiedBy: UniqueEntityId): void;
    markAsLost(modifiedBy: UniqueEntityId): void;
}
