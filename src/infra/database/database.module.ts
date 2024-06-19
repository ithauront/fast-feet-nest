import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository'
import { PrismaAttachmentRepository } from './prisma/repositories/prisma-attachment-repository'
import { PrismaLogRepository } from './prisma/repositories/prisma-log-repository'
import { PrismaCourierRepository } from './prisma/repositories/prisma-courier-repository'
import { PrismaPackageItemRepository } from './prisma/repositories/prisma-package-item-repository'
import { PrismaRecipientRepository } from './prisma/repositories/prisma-recipient-repository'
import { PrismaPackageItemAttachmentRepository } from './prisma/repositories/prisma-package-item-attachment-repository'
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository'
import { PackageItemRepository } from '@/domain/delivery/application/repositories/package-item-repository'
import { PackageItemAttachmentRepository } from '@/domain/delivery/application/repositories/package-item-attachment-repository'
import { LogsRepository } from '@/domain/delivery/application/repositories/logs-repository'
import { CourierRepository } from '@/domain/delivery/application/repositories/courier-repository'
import { AttachmentsRepository } from '@/domain/delivery/application/repositories/attachment-repository'
import { AdminRepository } from '@/domain/delivery/application/repositories/admin-repository'

@Module({
  providers: [
    PrismaService,
    { provide: AdminRepository, useClass: PrismaAdminRepository },
    { provide: AttachmentsRepository, useClass: PrismaAttachmentRepository },
    { provide: CourierRepository, useClass: PrismaCourierRepository },
    { provide: LogsRepository, useClass: PrismaLogRepository },
    {
      provide: PackageItemAttachmentRepository,
      useClass: PrismaPackageItemAttachmentRepository,
    },
    { provide: PackageItemRepository, useClass: PrismaPackageItemRepository },
    { provide: RecipientRepository, useClass: PrismaRecipientRepository },
  ],
  exports: [
    PrismaService,
    AdminRepository,
    AttachmentsRepository,
    CourierRepository,
    LogsRepository,
    PackageItemAttachmentRepository,
    PackageItemRepository,
    RecipientRepository,
  ],
})
export class DatabaseModule {}
