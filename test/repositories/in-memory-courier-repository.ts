import { QueryParams } from '@/core/repositories/query-params'
import { CourierRepository } from '@/domain/delivery/application/repositories/courier-repository'
import { Courier } from '@/domain/delivery/enterprise/entities/courier'

export class InMemoryCourierRepository implements CourierRepository {
  public items: Courier[] = []

  async create(courier: Courier) {
    this.items.push(courier)
  }

  async findById(courierId: string): Promise<Courier | null> {
    const courier = this.items.find((item) => item.id.toString() === courierId)
    if (!courier) {
      return null
    }
    return courier
  }

  async findByEmail(email: string): Promise<Courier | null> {
    const courier = this.items.find((item) => item.email === email)
    if (!courier) {
      return null
    }
    return courier
  }

  async findByCpf(cpf: string): Promise<Courier | null> {
    const courier = this.items.find((item) => item.cpf === cpf)
    if (!courier) {
      return null
    }
    return courier
  }

  async findMany({ page }: QueryParams): Promise<Courier[]> {
    const courier = this.items.slice((page - 1) * 20, page * 20)

    return courier
  }

  async save(courier: Courier): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === courier.id)

    this.items[itemIndex] = courier
  }
}
