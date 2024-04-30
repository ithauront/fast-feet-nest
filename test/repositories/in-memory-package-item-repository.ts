import { DomainEvents } from '@/core/events/domain-events'
import { QueryParams } from '@/core/repositories/query-params'
import { PackageItemRepository } from '@/domain/delivery/application/repositories/package-item-repository'
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'
import { InMemoryPackageItemAttachmentRepository } from './in-memory-package-item-attachment-repository'
import { InMemoryAttachmentsRepository } from './in-memory-attachment-repository'

export class InMemoryPackageItemRepository implements PackageItemRepository {
  public items: PackageItem[] = []

  constructor(
    private inMemorypackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository,
    private inMemoryAttachmentsRepository: InMemoryAttachmentsRepository,
  ) {}

  async create(packageItem: PackageItem) {
    this.items.push(packageItem)
  }

  async findById(packageId: string): Promise<PackageItem | null> {
    const packageItem = this.items.find(
      (item) => item.id.toString() === packageId,
    )
    if (!packageItem) {
      return null
    }
    return packageItem
  }

  async findPackageItemWithDetailsById(
    packageId: string,
  ): Promise<PackageItemWithDetails | null> {
    const packageItem = this.items.find(
      (item) => item.id.toString() === packageId,
    )
    if (!packageItem) {
      return null
    }
    const packageItemAttachments =
      await this.inMemorypackageItemAttachmentsRepository.findByPackageItemId(
        packageItem.id.toString(),
      )
    const attachments = packageItemAttachments.map((packageItemAttachment) => {
      const attachment = this.inMemoryAttachmentsRepository.items.find((att) =>
        att.id.equals(packageItemAttachment.attachmentId),
      )
      if (!attachment) {
        throw new Error(
          `Attachment with id ${packageItemAttachment.attachmentId.toString()} does not exist`,
        )
      }
      return attachment
    })

    const packageItemWithDetails = PackageItemWithDetails.create({
      packageItemId: packageItem.id,
      courierId: packageItem.courierId,
      recipientId: packageItem.recipientId,
      deliveryAddress: packageItem.deliveryAddress,
      title: packageItem.title,
      status: packageItem.status,
      attachments,
      createdAt: packageItem.createdAt ?? new Date(),
      updatedAt: packageItem.updatedAt,
    })

    return packageItemWithDetails
  }

  async findManyByParamsAndCourierId(
    { page, address, status }: QueryParams,
    courierId?: string | null,
  ): Promise<PackageItemWithDetails[]> {
    const items = this.items.filter(
      (item) =>
        (courierId === null
          ? item.courierId === null
          : item.courierId?.toString() === courierId) &&
        (!status || item.status === status) &&
        (!address || item.deliveryAddress === address),
    )

    const detailedItems = await Promise.all(
      items.map(async (item) => {
        const packageItemAttachments =
          await this.inMemorypackageItemAttachmentsRepository.findByPackageItemId(
            item.id.toString(),
          )
        const attachments = packageItemAttachments.map(
          (packageItemAttachment) => {
            const attachment = this.inMemoryAttachmentsRepository.items.find(
              (att) => {
                return att.id.equals(packageItemAttachment.attachmentId)
              },
            )
            if (!attachment) {
              throw new Error(
                `Attachment with id ${packageItemAttachment.attachmentId.toString()} does not exist`,
              )
            }
            return attachment
          },
        )

        const packageItemWithDetails = PackageItemWithDetails.create({
          packageItemId: item.id,
          courierId: item.courierId,
          recipientId: item.recipientId,
          deliveryAddress: item.deliveryAddress,
          title: item.title,
          status: item.status,
          attachments,
          createdAt: item.createdAt ?? new Date(),
          updatedAt: item.updatedAt,
        })
        return packageItemWithDetails
      }),
    )

    return detailedItems.slice((page - 1) * 20, page * 20)
  }

  async findManyByParams({
    page,
    status,
    address,
  }: QueryParams): Promise<PackageItemWithDetails[]> {
    const items = this.items.filter(
      (item) =>
        (!status || item.status === status) &&
        (!address || item.deliveryAddress === address),
    )

    const detailedItems = await Promise.all(
      items.map(async (item) => {
        const packageItemAttachments =
          await this.inMemorypackageItemAttachmentsRepository.findByPackageItemId(
            item.id.toString(),
          )
        const attachments = packageItemAttachments.map(
          (packageItemAttachment) => {
            const attachment = this.inMemoryAttachmentsRepository.items.find(
              (att) => {
                return att.id.equals(packageItemAttachment.attachmentId)
              },
            )
            if (!attachment) {
              throw new Error(
                `Attachment with id ${packageItemAttachment.attachmentId.toString()} does not exist`,
              )
            }
            return attachment
          },
        )

        const packageItemWithDetails = PackageItemWithDetails.create({
          packageItemId: item.id,
          courierId: item.courierId,
          recipientId: item.recipientId,
          deliveryAddress: item.deliveryAddress,
          title: item.title,
          status: item.status,
          attachments, // Aqui os attachments são objetos completos, incluindo título e link
          createdAt: item.createdAt ?? new Date(),
          updatedAt: item.updatedAt,
        })
        return packageItemWithDetails
      }),
    )

    return detailedItems.slice((page - 1) * 20, page * 20)
  }

  async save(packageItem: PackageItem): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === packageItem.id)
    this.items[itemIndex] = packageItem
    DomainEvents.dispatchEventsForAggregate(packageItem.id)
  }
}
