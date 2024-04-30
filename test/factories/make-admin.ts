import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Admin, AdminProps } from '@/domain/delivery/enterprise/entities/admin'
import { faker } from '@faker-js/faker'
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
