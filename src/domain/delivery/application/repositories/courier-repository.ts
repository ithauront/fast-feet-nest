import { QueryParams } from '@/core/repositories/query-params'
import { Courier } from '@/domain/delivery/enterprise/entities/courier'

export abstract class CourierRepository {
  abstract create(courier: Courier): Promise<void>
  abstract findById(courierId: string): Promise<Courier | null>
  abstract findByEmail(email: string): Promise<Courier | null>
  abstract findByCpf(cpf: string): Promise<Courier | null>
  abstract save(courier: Courier): Promise<void>
  abstract findMany(params: QueryParams): Promise<Courier[]>
}
