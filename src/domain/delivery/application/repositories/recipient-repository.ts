import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'
import { QueryParams } from '@/core/repositories/query-params'

export abstract class RecipientRepository {
  abstract create(recipient: Recipient): Promise<void>
  abstract findById(recipientId: string): Promise<Recipient | null>
  abstract findByEmail(email: string): Promise<Recipient | null>
  abstract save(recipient: Recipient): Promise<void>
  abstract findMany(params: QueryParams): Promise<Recipient[]>
}
