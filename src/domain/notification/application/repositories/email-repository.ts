import { Email } from '../../enterprise/entities/email'

export interface EmailRepository {
  findById(id: string): Promise<Email | null>
  create(email: Email): Promise<void>
  save(email: Email): Promise<void>
}
