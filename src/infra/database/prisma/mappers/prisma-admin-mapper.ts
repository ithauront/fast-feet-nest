import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Admin } from '@/domain/delivery/enterprise/entities/admin'
import { Prisma, Admin as PrismaAdmin } from '@prisma/client'

export class PrismaAdminMapper {
  static toDomain(raw: PrismaAdmin): Admin {
    return Admin.create(
      {
        name: raw.name,
        email: raw.email,
        cpf: raw.cpf,
        password: raw.password,
        isActive: raw.isActive,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(admin: Admin): Prisma.AdminUncheckedCreateInput {
    return {
      id: admin.id.toString(),
      name: admin.name,
      email: admin.email,
      cpf: admin.cpf,
      password: admin.props.password,
      isAdmin: true,
      isActive: admin.isActive,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
    }
  }
}
