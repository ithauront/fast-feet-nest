import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';
import { PackageItem, PackageStatus } from '../entities/package-item';
export declare class PackageItemStatusChangeEvent implements DomainEvent {
    ocurredAt: Date;
    packageItem: PackageItem;
    changedBy: UniqueEntityId;
    previousStatus: PackageStatus;
    constructor(packageItem: PackageItem, changedBy: UniqueEntityId, previousStatus: PackageStatus);
    getAggregateId(): UniqueEntityId;
}
