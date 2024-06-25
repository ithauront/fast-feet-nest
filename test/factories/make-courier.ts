import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Courier,
  CourierProps,
} from '@/domain/delivery/enterprise/entities/courier'
import { PrismaCourierMapper } from '@/infra/database/prisma/mappers/prisma-courier-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'
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

@Injectable()
export class CourierFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaCourier(data: Partial<CourierProps> = {}): Promise<Courier> {
    const courier = makeCourier(data)

    await this.prisma.courier.create({
      data: await PrismaCourierMapper.toPrisma(courier),
    })
    return courier
  }
}
