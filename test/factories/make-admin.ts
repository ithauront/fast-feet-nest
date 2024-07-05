import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Admin, AdminProps } from '@/domain/delivery/enterprise/entities/admin'
import { PrismaAdminMapper } from '@/infra/database/prisma/mappers/prisma-admin-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'

export function makeAdmin(
  override: Partial<AdminProps> = {},
  id?: UniqueEntityId,
) {
  const { createdAt, ...safeOverride } = override
  const admin = Admin.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cpf: fakeCPFGenerator(),
      password: faker.internet.password(),
      isActive: true,
      ...safeOverride,
      createdAt: createdAt ?? new Date(),
    },
    id,
  )
  return admin
}

@Injectable()
export class AdminFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAdmin(data: Partial<AdminProps> = {}): Promise<Admin> {
    const admin = makeAdmin(data)

    await this.prisma.admin.create({
      data: PrismaAdminMapper.toPrisma(admin),
    })
    return admin
  }

  async checkForExistingAdmin() {
    try {
      const existingAdmin = await this.prisma.admin.findFirst()
      return !!existingAdmin
    } catch (error) {
      console.error('Failed to check for existing admin:', error)
      throw error
    }
  }
}
