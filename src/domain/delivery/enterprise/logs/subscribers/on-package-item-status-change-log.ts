import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { PackageItemStatusChangeEvent } from '@/domain/delivery/enterprise/events/package-item-status-change'
import { LogsRepository } from '@/domain/delivery/application/repositories/logs-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { LogEntry } from '../logEntry'

export class OnPackageItemStatusChangeLog implements EventHandler {
  constructor(private logsRepository: LogsRepository) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.packageItemStatusChangeLog.bind(this),
      PackageItemStatusChangeEvent.name,
    )
  }

  private async packageItemStatusChangeLog(
    event: PackageItemStatusChangeEvent,
  ) {
    const logEntry = new LogEntry(
      new UniqueEntityId(),
      event.packageItem.id,
      event.previousStatus,
      event.packageItem.status,
      event.changedBy,
      event.ocurredAt,
    )

    await this.logsRepository.create(logEntry)
  }
}
