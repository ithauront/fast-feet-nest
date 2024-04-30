import { QueryParams } from '@/core/repositories/query-params'
import { AdminRepository } from '@/domain/delivery/application/repositories/admin-repository'
import { Admin } from '@/domain/delivery/enterprise/entities/admin'

export class InMemoryAdminRepository implements AdminRepository {
  public items: Admin[] = []

  async create(admin: Admin) {
    this.items.push(admin)
  }

  async findById(adminId: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.id.toString() === adminId)
    if (!admin) {
      return null
    }
    return admin
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.email === email)
    if (!admin) {
      return null
    }
    return admin
  }

  async findByCpf(cpf: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.cpf === cpf)
    if (!admin) {
      return null
    }
    return admin
  }

  async findMany({ page }: QueryParams): Promise<Admin[]> {
    const admin = this.items.slice((page - 1) * 20, page * 20)

    return admin
  }

  async save(admin: Admin): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === admin.id)

    this.items[itemIndex] = admin
  }
}
