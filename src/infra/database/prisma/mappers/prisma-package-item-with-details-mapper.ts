import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import {
  PackageItem as PrismaPackageItem,
  Attachment as PrismaAttachment,
} from '@prisma/client'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'
import { PrismaAttachmentMapper } from './prisma-attachment-mapper'

export class PrismaPackageItemWithDetailsMapper {
  static toDomain(
    raw: PrismaPackageItem & { attachments: PrismaAttachment[] },
  ): PackageItemWithDetails {
    const attachment = raw.attachments.map((attachment) =>
      PrismaAttachmentMapper.toDomain(attachment),
    )

    return PackageItemWithDetails.create({
      deliveryAddress: raw.deliveryAddress,
      recipientId: new UniqueEntityId(raw.recipientId),
      title: raw.title,
      courierId: raw.courierId ? new UniqueEntityId(raw.courierId) : null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      status: PackageStatus[raw.status as keyof typeof PackageStatus],
      attachments: attachment,
      packageItemId: new UniqueEntityId(raw.id),
    })
  }
}
