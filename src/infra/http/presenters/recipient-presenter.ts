import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

export class RecipientPresenter {
  static toHTTP(recipient: Recipient) {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      email: recipient.email,
      address: recipient.address,
      createdAt: recipient.createdAt,
      updatedAt: recipient.updatedAt,
    }
  }
}
