import { QueryParams } from '@/core/repositories/query-params'
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item'
import { PackageItemWithDetails } from '../../enterprise/entities/value-object/package-item-with-details'

export abstract class PackageItemRepository {
  abstract create(packageItem: PackageItem): Promise<void>
  abstract findById(packageId: string): Promise<PackageItem | null>
  abstract findPackageItemWithDetailsById(
    packageId: string,
  ): Promise<PackageItemWithDetails | null>

  abstract findManyByParamsAndCourierId(
    params: QueryParams,
    courierId?: string | null,
  ): Promise<PackageItemWithDetails[]>

  abstract findManyByParams(
    params: QueryParams,
  ): Promise<PackageItemWithDetails[]>

  abstract save(packageItem: PackageItem): Promise<void>
}
