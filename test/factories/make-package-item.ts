import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  PackageItem,
  PackageItemProps,
} from '@/domain/delivery/enterprise/entities/package-item'
import { PrismaPackageItemMapper } from '@/infra/database/prisma/mappers/prisma-package-item-mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function makePackageItem(
  override: Partial<PackageItemProps> = {},
  id?: UniqueEntityId,
) {
  const { createdAt, ...safeOverride } = override
  const packageItem = PackageItem.create(
    {
      title: faker.lorem.sentence(),
      deliveryAddress: faker.location.street(),
      recipientId: new UniqueEntityId(),
      ...safeOverride,
      createdAt: createdAt ?? new Date(),
    },
    id,
  )
  return packageItem
}

@Injectable()
export class PackageItemFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPackageItem(
    data: Partial<PackageItemProps>,
  ): Promise<PackageItem> {
    const packageItem = makePackageItem(data)

    await this.prisma.packageItem.create({
      data: PrismaPackageItemMapper.toPrisma(packageItem),
    })
    return packageItem
  }
}
