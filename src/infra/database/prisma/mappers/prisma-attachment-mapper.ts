import { Attachment } from '@/domain/delivery/enterprise/entities/attachment'
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client'

export class PrismaAttachmentMapper {
  static toDomain(raw: PrismaAttachment): Attachment {
    return Attachment.create({
      title: raw.title,
      link: raw.link,
    })
  }

  static toPrisma(attachment: Attachment): Prisma.AttachmentCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      link: attachment.link,
    }
  }
}
