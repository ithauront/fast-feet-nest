import { QueryParams } from '@/core/repositories/query-params'
import { Courier } from '@/domain/delivery/enterprise/entities/courier'

export interface CourierRepository {
  create(courier: Courier): Promise<void>
  findById(courierId: string): Promise<Courier | null>
  findByEmail(email: string): Promise<Courier | null>
  findByCpf(cpf: string): Promise<Courier | null>
  save(courier: Courier): Promise<void>
  findMany(params: QueryParams): Promise<Courier[]>
}
