import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { PackageItemStatusChangeEvent } from '@/domain/delivery/enterprise/events/package-item-status-change'

export class OnMarkedAsDelivered implements EventHandler {
  constructor(private sendNotification: SendNotificationUseCase) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendMarkAsDeliveredNotification.bind(this),
      PackageItemStatusChangeEvent.name,
    )
  }

  private async sendMarkAsDeliveredNotification({
    packageItem,
  }: PackageItemStatusChangeEvent) {
    await this.sendNotification.execute({
      recipientId: packageItem.recipientId.toString(),
      title: 'Change status in your package',
      content: `Your package is now ${packageItem.status}`,
    })
  }
}
