import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'
import { QueryParams } from '@/core/repositories/query-params'

export interface RecipientRepository {
  create(recipient: Recipient): Promise<void>
  findById(recipientId: string): Promise<Recipient | null>
  findByEmail(email: string): Promise<Recipient | null>
  save(recipient: Recipient): Promise<void>
  findMany(params: QueryParams): Promise<Recipient[]>
}
