import { QueryParams } from '@/core/repositories/query-params'
import { PackageItemRepository } from '@/domain/delivery/application/repositories/package-item-repository'
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'
import { Injectable } from '@nestjs/common'
import { PrismaPackageItemMapper } from '../mappers/prisma-package-item-mapper'
import { PrismaPackageItemWithDetailsMapper } from '../mappers/prisma-package-item-with-details-mapper'
import { PackageStatus } from '@prisma/client'
import { PackageItemAttachmentRepository } from '@/domain/delivery/application/repositories/package-item-attachment-repository'
import { DomainEvents } from '@/core/events/domain-events'
import { PrismaService } from '../prisma.service'
import { CacheRepository } from '@/infra/cache/cache-repository'

@Injectable()
export class PrismaPackageItemRepository implements PackageItemRepository {
  constructor(
    private prisma: PrismaService,
    private packageItemAttachment: PackageItemAttachmentRepository,
    private cacheRepository: CacheRepository,
  ) {}

  async create(packageItem: PackageItem): Promise<void> {
    const data = PrismaPackageItemMapper.toPrisma(packageItem)
    await this.prisma.packageItem.create({ data })
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
    const cacheHit = await this.cacheRepository.get(
      `packageItem:${packageId}:details`,
    )
    if (cacheHit) {
      const cacheData = JSON.parse(cacheHit)
      return cacheData
    }
    const packageItemWithDetails = await this.prisma.packageItem.findUnique({
      where: { id: packageId },
      include: { attachments: true },
    })

    if (!packageItemWithDetails) {
      return null
    }
    const packageItemToDomain = PrismaPackageItemWithDetailsMapper.toDomain(
      packageItemWithDetails,
    )
    await this.cacheRepository.set(
      `packageItem:${packageId}:details`,
      JSON.stringify(packageItemToDomain),
    )
    return packageItemToDomain
  }

  async findManyByParamsAndCourierId(
    { page, status, address }: QueryParams,
    courierId?: string | null | undefined,
  ): Promise<PackageItemWithDetails[]> {
    const cacheKey = `packageItems:page=${page}-status=${status || 'any'}-address=${address || 'any'}-courierId=${courierId || 'any'}`

    const cacheHit = await this.cacheRepository.get(cacheKey)
    if (cacheHit) {
      return JSON.parse(cacheHit)
    }

    const where = {
      ...(status && {
        status: PrismaPackageItemMapper.mapStatusForPrisma(status),
      }),
      ...(address && { deliveryAddress: address }),
      ...(courierId && { courierId }),
    }

    const packageItems = await this.prisma.packageItem.findMany({
      where,
      take: 20,
      skip: (page - 1) * 20,
      orderBy: { createdAt: 'desc' },
      include: { attachments: true },
    })
    const packageItemWithDetails = packageItems.map(
      PrismaPackageItemWithDetailsMapper.toDomain,
    )
    await this.cacheRepository.set(
      cacheKey,
      JSON.stringify(packageItemWithDetails),
    )
    return packageItemWithDetails
  }

  async findManyByParams({
    page,
    status,
    address,
  }: QueryParams): Promise<PackageItemWithDetails[]> {
    const cacheKey = `packageItems:page=${page}-status=${status || 'any'}-address=${address || 'any'}`

    const cacheHit = await this.cacheRepository.get(cacheKey)
    if (cacheHit) {
      return JSON.parse(cacheHit)
    }
    const where = {
      ...(status && { status: PackageStatus[status] }),
      ...(address && { deliveryAddress: address }),
    }

    const packageItem = await this.prisma.packageItem.findMany({
      where,
      take: 20,
      skip: (page - 1) * 20,
      orderBy: { createdAt: 'desc' },
      include: { attachments: true },
    })

    const packageItemWithDetails = packageItem.map(
      PrismaPackageItemWithDetailsMapper.toDomain,
    )
    await this.cacheRepository.set(
      cacheKey,
      JSON.stringify(packageItemWithDetails),
    )
    return packageItemWithDetails
  }

  async save(packageItem: PackageItem): Promise<void> {
    const data = PrismaPackageItemMapper.toPrisma(packageItem)

    await Promise.all([
      this.prisma.packageItem.update({
        where: { id: data.id },
        data,
      }),

      this.packageItemAttachment.createMany(
        packageItem.attachment.getNewItems(),
      ),
      this.packageItemAttachment.deleteMany(
        packageItem.attachment.getRemovedItems(),
      ),
      await this.cacheRepository.deleteAll(),
    ])
    DomainEvents.dispatchEventsForAggregate(packageItem.id)
  }
}
