import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  PackageItem,
  PackageStatus as EntityPackageStatus,
} from '@/domain/delivery/enterprise/entities/package-item'
import {
  PackageItem as PrismaPackageItem,
  Attachment as PrismaAttachment,
  Prisma,
  PackageStatus as PrismaPackageStatus,
} from '@prisma/client'
import { PrismaPackageItemAttachmentMapper } from './prisma-package-item-attachment-mapper'
import { PackageItemAttachmentList } from '@/domain/delivery/enterprise/entities/package-item-attachment-list'

export class PrismaPackageItemMapper {
  static PackageStatusMapping = {
    [EntityPackageStatus.AWAITING_PICKUP]: 'AWAITING_PICKUP',
    [EntityPackageStatus.IN_TRANSIT]: 'IN_TRANSIT',
    [EntityPackageStatus.DELIVERED]: 'DELIVERED',
    [EntityPackageStatus.RETURNED]: 'RETURNED',
    [EntityPackageStatus.LOST]: 'LOST',
  }

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
        status:
          EntityPackageStatus[raw.status as keyof typeof EntityPackageStatus],
        attachment: attachmentList,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    packageItem: PackageItem,
  ): Prisma.PackageItemUncheckedCreateInput {
    const attachments = packageItem.attachment
      .getItems()
      .map((item) => PrismaPackageItemAttachmentMapper.toPrisma(item))

    const status =
      PrismaPackageItemMapper.PackageStatusMapping[packageItem.status]

    return {
      id: packageItem.id.toString(),
      title: packageItem.title,
      deliveryAddress: packageItem.deliveryAddress,
      recipientId: packageItem.recipientId.toString(),
      courierId: packageItem.courierId?.toString(),
      createdAt: packageItem.createdAt,
      updatedAt: packageItem.updatedAt,
      status: status as PrismaPackageStatus,
      attachments: {
        create: attachments,
      },
    }
  }
}
