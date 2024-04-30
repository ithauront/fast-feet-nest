import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PackageStatus } from '../entities/package-item'

export class LogEntry {
  constructor(
    public id: UniqueEntityId,
    public packageItemId: UniqueEntityId,
    public previousState: PackageStatus,
    public newState: PackageStatus,
    public changedBy: UniqueEntityId,
    public changedAt: Date = new Date(),
  ) {}
}
