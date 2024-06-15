import { QueryParams } from '@/core/repositories/query-params'
import { PackageItemRepository } from '@/domain/delivery/application/repositories/package-item-repository'
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaPackageItemMapper } from '../mappers/prisma-package-item-mapper'
import { PrismaPackageItemWithDetailsMapper } from '../mappers/prisma-package-item-with-details-mapper'
import { PackageStatus } from '@prisma/client'
import { Attachment } from '@/domain/delivery/enterprise/entities/attachment'

@Injectable()
export class PrismaPackageItemRepository implements PackageItemRepository {
  constructor(private prisma: PrismaService) {}

  async create(packageItem: PackageItem): Promise<void> {}

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
    const packageItemWithDetails = await this.prisma.packageItem.findUnique({
      where: { id: packageId },
      include: { attachments: true },
    })

    if (!packageItemWithDetails) {
      return null
    }
    return PrismaPackageItemWithDetailsMapper.toDomain(packageItemWithDetails)
  }

  async findManyByParamsAndCourierId(
    { page, status, address }: QueryParams,
    courierId?: string | null | undefined,
  ): Promise<PackageItemWithDetails[]> {
    const where = {
      ...(status && { status: PackageStatus[status] }),
      ...(address && { deliveryAddress: address }),
      ...(courierId && { courierId }),
    }

    const PackageItemWithDetails = await this.prisma.packageItem.findMany({
      where,
      take: 20,
      skip: (page - 1) * 20,
      include: { attachments: true },
    })
    return PackageItemWithDetails.map(
      PrismaPackageItemWithDetailsMapper.toDomain,
    )
  }

  async findManyByParams({
    page,
    status,
    address,
  }: QueryParams): Promise<PackageItemWithDetails[]> {
    const where = {
      ...(status && { status: PackageStatus[status] }),
      ...(address && { deliveryAddress: address }),
    }

    const PackageItemWithDetails = await this.prisma.packageItem.findMany({
      where,
      take: 20,
      skip: (page - 1) * 20,
      include: { attachments: true },
    })
    return PackageItemWithDetails.map(
      PrismaPackageItemWithDetailsMapper.toDomain,
    )
  }

  async save(packageItem: PackageItem, attachment: Attachment): Promise<void> {
    const data = PrismaPackageItemMapper.toPrisa(packageItem)
  }
}