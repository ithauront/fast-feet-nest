import { Courier } from '@/domain/delivery/enterprise/entities/courier'

export class CourierPresenter {
  static toHTTP(courier: Courier) {
    return {
      id: courier.id.toString(),
      name: courier.name,
      cpf: courier.cpf,
      email: courier.email,
      status: courier.status,
      phone: courier.phone,
      isAdmin: courier.isAdmin,
      location: courier.location,
      createdAt: courier.createdAt,
      updatedAt: courier.updatedAt,
    }
  }
}
