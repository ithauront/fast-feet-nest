import { AttachmentsRepository } from '@/domain/delivery/application/repositories/attachment-repository'
import { Attachment } from '@/domain/delivery/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAttachmentMapper } from '../mappers/prisma-attachment-mapper'

@Injectable()
export class PrismaAttachmentRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(attachment: Attachment): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async createWithDetails(attachment: Attachment): Promise<void> {
    const data = PrismaAttachmentMapper.toPrisma(attachment, null, false)
    await this.prisma.attachment.create({ data })
  }

  async findById(attachmentId: string): Promise<Attachment | null> {
    const attachment = await this.prisma.attachment.findUnique({
      where: { id: attachmentId },
    })
    if (!attachment) {
      return null
    }
    return PrismaAttachmentMapper.toDomain(attachment)
  }
}
