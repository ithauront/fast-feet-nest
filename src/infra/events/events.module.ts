import { OnStatusChange } from '@/domain/notification/application/subscribers/on-status-change'
import { OnRequestPasswordChange } from '@/domain/notification/application/subscribers/on-request-password-change'
import { SendEmailUseCase } from '@/domain/notification/application/use-cases/send-email'
import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { EnvModule } from '../env/env.module'
import { EmailService } from '@/domain/notification/application/services/email-service'
import { SendInBlueEmailService } from './services/sendinblue-email-service'
import { OnPackageItemStatusChangeLog } from '@/domain/delivery/enterprise/logs/subscribers/on-package-item-status-change-log'

@Module({
  imports: [DatabaseModule, EnvModule],
  providers: [
    SendEmailUseCase,
    OnPackageItemStatusChangeLog,
    OnStatusChange,
    OnRequestPasswordChange,
    {
      provide: EmailService,
      useClass: SendInBlueEmailService,
    },
  ],
})
export class EventsModule {}
