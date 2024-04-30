import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { PackageStatus } from '../entities/package-item';
export declare class LogEntry {
    id: UniqueEntityId;
    packageItemId: UniqueEntityId;
    previousState: PackageStatus;
    newState: PackageStatus;
    changedBy: UniqueEntityId;
    changedAt: Date;
    constructor(id: UniqueEntityId, packageItemId: UniqueEntityId, previousState: PackageStatus, newState: PackageStatus, changedBy: UniqueEntityId, changedAt?: Date);
}
