import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { PackageItemStatusChangeEvent } from '@/domain/delivery/enterprise/events/package-item-status-change'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnMarkedAsReturned implements EventHandler {
  constructor(private sendNotification: SendNotificationUseCase) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendMarkAsReturnedNotification.bind(this),
      PackageItemStatusChangeEvent.name,
    )
  }

  private async sendMarkAsReturnedNotification({
    packageItem,
  }: PackageItemStatusChangeEvent) {
    await this.sendNotification.execute({
      recipientId: packageItem.recipientId.toString(),
      title: 'Change status in your package',
      content: `Your package is now ${packageItem.status}`,
    })
  }
}
