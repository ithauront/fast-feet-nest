import { QueryParams } from '@/core/repositories/query-params'
import { Admin } from '@/domain/delivery/enterprise/entities/admin'

export abstract class AdminRepository {
  abstract create(admin: Admin): Promise<void>
  abstract findById(adminId: string): Promise<Admin | null>
  abstract findByEmail(email: string): Promise<Admin | null>
  abstract findByCpf(cpf: string): Promise<Admin | null>
  abstract save(admin: Admin): Promise<void>
  abstract findMany(params: QueryParams): Promise<Admin[]>
}
