import { Admin } from '@/domain/delivery/enterprise/entities/admin'

export class AdminPresenter {
  static toHTTP(admin: Admin) {
    return {
      id: admin.id.toString(),
      name: admin.name,
      cpf: admin.cpf,
      email: admin.email,
      isActive: admin.isActive,
      isAdmin: admin.isAdmin,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    }
  }
}
