import { QueryParams } from '@/core/repositories/query-params';
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item';
import { PackageItemWithDetails } from '../../enterprise/entities/value-object/package-item-with-details';
export interface PackageItemRepository {
    create(packageItem: PackageItem): Promise<void>;
    findById(packageId: string): Promise<PackageItem | null>;
    findPackageItemWithDetailsById(packageId: string): Promise<PackageItemWithDetails | null>;
    findManyByParamsAndCourierId(params: QueryParams, courierId?: string | null): Promise<PackageItemWithDetails[]>;
    findManyByParams(params: QueryParams): Promise<PackageItemWithDetails[]>;
    save(packageItem: PackageItem): Promise<void>;
}
