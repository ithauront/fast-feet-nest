import {
  Attachment,
  AttachmentProps,
} from '@/domain/delivery/enterprise/entities/attachment'
import { PrismaAttachmentRepository } from '../prisma/repositories/prisma-attachment-repository'

export class AttachmentService {
  constructor(private attachmentsRepository: PrismaAttachmentRepository) {}

  async createAttachment(
    { link, title }: AttachmentProps,
    packageItemId: string,
    isImmutable: boolean,
  ) {
    const attachment = Attachment.create({
      title,
      link,
    })

    await this.attachmentsRepository.createWithDetails(
      attachment,
      packageItemId,
      isImmutable,
    )
  }
}
