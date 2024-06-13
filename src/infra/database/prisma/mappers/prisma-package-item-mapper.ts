import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  PackageItem,
  PackageStatus,
} from '@/domain/delivery/enterprise/entities/package-item'
import {
  PackageItem as PrismaPackageItem,
  Attachment as PrismaAttachment,
} from '@prisma/client'
import { PrismaPackageItemAttachmentMapper } from './prisma-package-item-attachment-mapper'
import { PackageItemAttachmentList } from '@/domain/delivery/enterprise/entities/package-item-attachment-list'

export class PrismaPackageItemMapper {
  static toDomain(
    raw: PrismaPackageItem & { attachments: PrismaAttachment[] },
  ): PackageItem {
    const attachment = raw.attachments.map((attachment) =>
      PrismaPackageItemAttachmentMapper.toDomain(attachment),
    )
    const attachmentList = new PackageItemAttachmentList(attachment)
    return PackageItem.create(
      {
        deliveryAddress: raw.deliveryAddress,
        recipientId: new UniqueEntityId(raw.recipientId),
        title: raw.title,
        courierId: raw.courierId ? new UniqueEntityId(raw.courierId) : null,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        status: PackageStatus[raw.status as keyof typeof PackageStatus],
        attachment: attachmentList,
      },
      new UniqueEntityId(raw.id),
    )
  }
}
