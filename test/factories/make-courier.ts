import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Courier,
  CourierProps,
} from '@/domain/delivery/enterprise/entities/courier'
import { faker } from '@faker-js/faker'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'

export function makeCourier(
  override: Partial<CourierProps> = {},
  id?: UniqueEntityId,
) {
  const { createdAt, ...safeOverride } = override
  const courier = Courier.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cpf: fakeCPFGenerator(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
      ...safeOverride,
      createdAt: createdAt ?? new Date(),
    },
    id,
  )
  return courier
}
