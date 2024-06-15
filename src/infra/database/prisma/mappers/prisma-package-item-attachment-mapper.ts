import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Attachment } from '@/domain/delivery/enterprise/entities/attachment'
import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaPackageItemAttachmentMapper {
  static toDomain(raw: PrismaAttachment): PackageItemAttachment {
    const attachment = Attachment.create(
      {
        title: raw.title,
        link: raw.link,
      },
      new UniqueEntityId(raw.id),
    )
    return PackageItemAttachment.create(
      {
        packageItemId: new UniqueEntityId(
          raw.packageItemId ? raw.packageItemId : undefined,
        ),
        attachmentId: new UniqueEntityId(raw.id),
        isImmutable: raw.isImmutable,
        attachment,
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
