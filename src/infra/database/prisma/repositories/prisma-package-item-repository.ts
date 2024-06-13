import { QueryParams } from '@/core/repositories/query-params'
import { PackageItemRepository } from '@/domain/delivery/application/repositories/package-item-repository'
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaPackageItemMapper } from '../mappers/prisma-package-item-mapper'

@Injectable()
export class PrismaPackageItemRepository implements PackageItemRepository {
  constructor(private prisma: PrismaService) {}

  async create(packageItem: PackageItem): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findById(packageId: string): Promise<PackageItem | null> {
    const packageItem = await this.prisma.packageItem.findUnique({
      where: { id: packageId },
      include: { attachments: true },
    })

    if (!packageItem) {
      return null
    }
    return PrismaPackageItemMapper.toDomain(packageItem)
  }

  async findPackageItemWithDetailsById(
    packageId: string,
  ): Promise<PackageItemWithDetails | null> {
    throw new Error('Method not implemented.')
  }

  async findManyByParamsAndCourierId(
    params: QueryParams,
    courierId?: string | null | undefined,
  ): Promise<PackageItemWithDetails[]> {
    throw new Error('Method not implemented.')
  }

  async findManyByParams(
    params: QueryParams,
  ): Promise<PackageItemWithDetails[]> {
    throw new Error('Method not implemented.')
  }

  async save(packageItem: PackageItem): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
