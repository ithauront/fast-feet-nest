import { Email } from '../../enterprise/entities/email'

export abstract class EmailRepository {
  abstract findById(id: string): Promise<Email | null>
  abstract create(email: Email): Promise<void>
  abstract save(email: Email): Promise<void>
}
