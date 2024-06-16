import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Attachment } from '@/domain/delivery/enterprise/entities/attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAttachmentMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create(
      {
        title: raw.title,
        link: raw.link,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    attachment: Attachment,
    packageItemId: string | null,
    isImmutable: boolean,
  ): Prisma.AttachmentCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      link: attachment.link,
      packageItem: packageItemId
        ? { connect: { id: packageItemId } }
        : undefined,
      isImmutable,
    }
  }
}
