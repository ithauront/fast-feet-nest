import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { PackageItem, PackageStatus } from '../entities/package-item'

export class PackageItemStatusChangeEvent implements DomainEvent {
  public ocurredAt: Date
  public packageItem: PackageItem
  public changedBy: UniqueEntityId
  public previousStatus: PackageStatus

  constructor(
    packageItem: PackageItem,
    changedBy: UniqueEntityId,
    previousStatus: PackageStatus,
  ) {
    this.packageItem = packageItem
    this.ocurredAt = new Date()
    this.changedBy = changedBy
    this.previousStatus = previousStatus
  }

  getAggregateId(): UniqueEntityId {
    return this.packageItem.id
  }
}
