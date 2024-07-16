import { OnStatusChange } from '@/domain/notification/application/subscribers/on-status-change'
import { OnRequestPasswordChange } from '@/domain/notification/application/subscribers/on-request-password-change'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'
import { SendEmailUseCase } from '@/domain/notification/application/use-cases/send-email'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { EnvModule } from '../env/env.module'
import { EmailService } from '@/domain/notification/application/services/email-service'
import { SendInBlueEmailService } from './services/sendinblue-email-service'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [
    SendEmailUseCase,
    SendNotificationUseCase,
    ReadNotificationUseCase,

    OnStatusChange,
    OnRequestPasswordChange,
    {
      provide: EmailService,
      useClass: SendInBlueEmailService,
    },
  ],
})
export class EventsModule {}
