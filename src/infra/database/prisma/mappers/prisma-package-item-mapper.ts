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
    [EntityPackageStatus.AWAITING_PICKUP]: PrismaPackageStatus.AWAITING_PICKUP,
    [EntityPackageStatus.IN_TRANSIT]: PrismaPackageStatus.IN_TRANSIT,
    [EntityPackageStatus.DELIVERED]: PrismaPackageStatus.DELIVERED,
    [EntityPackageStatus.RETURNED]: PrismaPackageStatus.RETURNED,
    [EntityPackageStatus.LOST]: PrismaPackageStatus.LOST,
  }

  static mapStatusForPrisma(status: EntityPackageStatus): PrismaPackageStatus {
    const mappedStatus = this.PackageStatusMapping[status]
    if (!mappedStatus) {
      throw new Error(`Invalid status for mapping: ${status}`)
    }
    return mappedStatus
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
    const attachmentsConnectIds = packageItem.attachment
      .getItems()
      .map((att) => ({
        id: att.attachmentId.toString(),
      }))

    const data = {
      id: packageItem.id.toString(),
      title: packageItem.title,
      deliveryAddress: packageItem.deliveryAddress,
      recipientId: packageItem.recipientId.toString(),
      courierId: packageItem.courierId?.toString(),
      createdAt: packageItem.createdAt,
      updatedAt: packageItem.updatedAt,
      status: PrismaPackageItemMapper.mapStatusForPrisma(packageItem.status),
      attachments: {
        connect: attachmentsConnectIds,
      },
    }

    return data
  }
}
