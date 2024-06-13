import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'
import { Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaPackageItemAttachmentMapper {
  static toDomain(raw: PrismaAttachment): PackageItemAttachment {
    return PackageItemAttachment.create(
      {
        packageItemId: new UniqueEntityId(
          raw.packageItemId ? raw.packageItemId : undefined,
        ),
        attachmentId: new UniqueEntityId(raw.id),
        isImmutable: raw.isImmutable,
      },
      new UniqueEntityId(raw.id),
    )
  }
}
