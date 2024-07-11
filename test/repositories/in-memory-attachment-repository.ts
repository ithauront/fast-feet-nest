import { AttachmentsRepository } from '@/domain/delivery/application/repositories/attachment-repository'
import { Attachment } from '@/domain/delivery/enterprise/entities/attachment'

export class InMemoryAttachmentsRepository implements AttachmentsRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }

  async createWithDetails(attachment: Attachment) {
    this.items.push(attachment)
  }

  async findById(attachmentId: string): Promise<Attachment | null> {
    const attachment = this.items.find(
      (item) => item.id.toString() === attachmentId,
    )
    if (!attachment) {
      return null
    }
    return attachment
  }
}
