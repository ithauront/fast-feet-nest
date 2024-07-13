import { OnMarkedAsDelivered } from '@/domain/notification/application/subscribers/on-marked-as-delivered'
import { OnMarkedAsInTransit } from '@/domain/notification/application/subscribers/on-marked-as-in-transit'
import { OnMarkedAsLost } from '@/domain/notification/application/subscribers/on-marked-as-lost'
import { OnMarkedAsReturned } from '@/domain/notification/application/subscribers/on-marked-as-returned'
import { OnRequestPasswordChange } from '@/domain/notification/application/subscribers/on-request-password-change'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'
import { SendEmailUseCase } from '@/domain/notification/application/use-cases/send-email'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  providers: [
    SendEmailUseCase,
    SendNotificationUseCase,
    ReadNotificationUseCase,
    OnMarkedAsDelivered,
    OnMarkedAsInTransit,
    OnMarkedAsDelivered,
    OnMarkedAsLost,
    OnMarkedAsReturned,
    OnRequestPasswordChange,
  ],
})
export class EventsModule {}
