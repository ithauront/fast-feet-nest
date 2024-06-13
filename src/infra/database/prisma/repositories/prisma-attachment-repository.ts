import { AttachmentsRepository } from '@/domain/delivery/application/repositories/attachment-repository'
import { Attachment } from '@/domain/delivery/enterprise/entities/attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAttachmentRepository implements AttachmentsRepository {
  constructor(private prisma: PrismaService) {}

  create(attachment: Attachment): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
