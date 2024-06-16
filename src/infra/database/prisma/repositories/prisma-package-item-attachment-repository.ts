import { PackageItemAttachmentRepository } from '@/domain/delivery/application/repositories/package-item-attachment-repository'
import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaPackageItemAttachmentMapper } from '../mappers/prisma-package-item-attachment-mapper'

@Injectable()
export class PrismaPackageItemAttachmentRepository
  implements PackageItemAttachmentRepository
{
  constructor(private prisma: PrismaService) {}

  async findByPackageItemId(
    packageId: string,
  ): Promise<PackageItemAttachment[]> {
    const packageItem = await this.prisma.attachment.findMany({
      where: { packageItemId: packageId },
    })
    return packageItem.map(PrismaPackageItemAttachmentMapper.toDomain)
  }
}
