import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Attachment } from '@/domain/delivery/enterprise/entities/attachment'
import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'
import { link } from 'fs'

export class PrismaPackageItemAttachmentMapper {
  static toDomain(raw: PrismaAttachment): PackageItemAttachment {
    const domainAttachment = {
      link: raw.link,
      title: raw.title,
    }
    return PackageItemAttachment.create(
      {
        packageItemId: new UniqueEntityId(
          raw.packageItemId ? raw.packageItemId : undefined,
        ),
        attachmentId: new UniqueEntityId(raw.id),
        isImmutable: raw.isImmutable,
        attachment: domainAttachment,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    packageItemAttachment: PackageItemAttachment,
  ): Prisma.AttachmentCreateInput {
    return {
      id: packageItemAttachment.attachmentId.toString(),
      packageItem: {
        connect: { id: packageItemAttachment.packageItemId.toString() },
      },
      isImmutable: packageItemAttachment.isImmutable,
      link: packageItemAttachment.props.attachment.link,
      title: packageItemAttachment.props.attachment.title,
    }
  }
}
