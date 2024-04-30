import { QueryParams } from '@/core/repositories/query-params'
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient) {
    this.items.push(recipient)
  }

  async findById(recipientId: string): Promise<Recipient | null> {
    const recipient = this.items.find(
      (item) => item.id.toString() === recipientId,
    )
    if (!recipient) {
      return null
    }
    return recipient
  }

  async findByEmail(email: string): Promise<Recipient | null> {
    const recipient = this.items.find((item) => item.email === email)
    if (!recipient) {
      return null
    }
    return recipient
  }

  async findMany({ page }: QueryParams): Promise<Recipient[]> {
    const recipients = this.items.slice((page - 1) * 20, page * 20)

    return recipients
  }

  async save(recipient: Recipient): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === recipient.id)

    this.items[itemIndex] = recipient
  }
}
