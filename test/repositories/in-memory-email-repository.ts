import { EmailRepository } from '@/domain/notification/application/repositories/email-repository'
import { Email } from '@/domain/notification/enterprise/entities/email'

export class InMemoryEmailRepository implements EmailRepository {
  public items: Email[] = []

  async findById(id: string) {
    const email = this.items.find((item) => item.id.toString() === id)
    if (!email) {
      return null
    }
    return email
  }

  async create(email: Email) {
    this.items.push(email)
  }

  async save(email: Email) {
    const itemIndex = this.items.findIndex((item) => item.id === email.id)

    this.items[itemIndex] = email
  }
}
