import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  PackageItem,
  PackageItemProps,
} from '@/domain/delivery/enterprise/entities/package-item'
import { faker } from '@faker-js/faker'

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
