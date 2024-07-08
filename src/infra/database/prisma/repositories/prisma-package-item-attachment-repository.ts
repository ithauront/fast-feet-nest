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

  async findManyByPackageItemId(
    packageId: string,
  ): Promise<PackageItemAttachment[]> {
    const packageItem = await this.prisma.attachment.findMany({
      where: { packageItemId: packageId },
    })
    return packageItem.map(PrismaPackageItemAttachmentMapper.toDomain)
  }

  async createMany(attachments: PackageItemAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const updates = attachments.map((att) =>
      this.prisma.attachment
        .update({
          where: { id: att.attachmentId.toString() },
          data: {
            packageItemId: att.packageItemId.toString(),
            isImmutable: att.isImmutable,
          },
        })
        .catch((err) => {
          console.error('Erro ao atualizar attachment:', err)
          throw err
        }),
    )

    await Promise.all(updates)
  }

  async deleteMany(attachments: PackageItemAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return
    }
    const attachmentIds = attachments
      .filter((att) => !att.isImmutable)
      .map((att) => att.id.toString())

    if (attachmentIds.length === 0) {
      return
    }
    await this.prisma.attachment.deleteMany({
      where: {
        id: { in: attachmentIds },
      },
    })
  }

  async deleteManyByPackageItemId(packageItemId: string): Promise<void> {
    const attachments = await this.prisma.attachment.findMany({
      where: { packageItemId },
      select: { id: true, isImmutable: true },
    })
    const mutableAttachmentIds = attachments
      .filter((att) => !att.isImmutable)
      .map((att) => att.id)

    if (mutableAttachmentIds.length === 0) {
      return
    }

    await this.prisma.attachment.deleteMany({
      where: {
        id: { in: mutableAttachmentIds },
      },
    })
  }
}
