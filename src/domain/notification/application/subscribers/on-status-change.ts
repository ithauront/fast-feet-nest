import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { PackageItemStatusChangeEvent } from '@/domain/delivery/enterprise/events/package-item-status-change'
import { Injectable } from '@nestjs/common'
import { SendEmailUseCase } from '../use-cases/send-email'
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository'
import { UserNotFoundError } from '@/domain/delivery/application/use-cases/errors/user-not-found-error'

@Injectable()
export class OnStatusChange implements EventHandler {
  constructor(
    private sendEmail: SendEmailUseCase,
    public recipientRepository: RecipientRepository,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.statusChangeNotification.bind(this),
      PackageItemStatusChangeEvent.name,
    )
  }

  private async statusChangeNotification({
    packageItem,
  }: PackageItemStatusChangeEvent) {
    const recipient = await this.recipientRepository.findById(
      packageItem.recipientId.toString(),
    )

    if (!recipient) {
      throw new UserNotFoundError()
    }
    await this.sendEmail.execute({
      recipientEmail: recipient?.email,
      subject: 'Change status in your package',
      body: `Your package is now ${packageItem.status}`,
    })
  }
}
