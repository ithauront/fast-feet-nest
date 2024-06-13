import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository'
import { PrismaAttachmentRepository } from './prisma/repositories/prisma-attachment-repository'
import { PrismaLogRepository } from './prisma/repositories/prisma-log-repository'
import { PrismaCourierRepository } from './prisma/repositories/prisma-courier-repository'
import { PrismaPackageItemRepository } from './prisma/repositories/prisma-package-item-repository'
import { PrismaRecipientRepository } from './prisma/repositories/prisma-recipient-repository'
import { PrismaPackageItemAttachmentRepository } from './prisma/repositories/prisma-package-item-attachment-repository'

@Module({
  providers: [
    PrismaService,
    PrismaAdminRepository,
    PrismaAttachmentRepository,
    PrismaCourierRepository,
    PrismaLogRepository,
    PrismaPackageItemAttachmentRepository,
    PrismaPackageItemRepository,
    PrismaRecipientRepository,
  ],
  exports: [
    PrismaService,
    PrismaAdminRepository,
    PrismaAttachmentRepository,
    PrismaCourierRepository,
    PrismaLogRepository,
    PrismaPackageItemAttachmentRepository,
    PrismaPackageItemRepository,
    PrismaRecipientRepository,
  ],
})
export class DatabaseModule {}
