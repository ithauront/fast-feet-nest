import { PackageItemAttachmentRepository } from '@/domain/delivery/application/repositories/package-item-attachment-repository'
import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaPackageItemAttachmentRepository
  implements PackageItemAttachmentRepository
{
  constructor(private prisma: PrismaService) {}

  findByPackageItemId(packageId: string): Promise<PackageItemAttachment[]> {
    throw new Error('Method not implemented.')
  }
}
