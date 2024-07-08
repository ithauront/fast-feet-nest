import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PackageItemAttachmentRepository } from '@/domain/delivery/application/repositories/package-item-attachment-repository'
import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'

export class InMemoryPackageItemAttachmentRepository
  implements PackageItemAttachmentRepository
{
  public items: PackageItemAttachment[] = []

  async findManyByPackageItemId(
    packageId: string,
  ): Promise<PackageItemAttachment[]> {
    const packageItemAttachment = this.items.filter(
      (item) => item.packageItemId.toString() === packageId,
    )

    return packageItemAttachment
  }

  async createMany(attachments: PackageItemAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: PackageItemAttachment[]): Promise<void> {
    const packageItemAttachment = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })
    this.items = packageItemAttachment
  }

  async deleteManyByPackageItemId(packageItemId: string): Promise<void> {
    const packageItemAttachment = this.items.filter(
      (item) => item.packageItemId.toString() !== packageItemId,
    )
    this.items = packageItemAttachment
  }

  async findByPackageItemId(
    packageId: string,
  ): Promise<PackageItemAttachment[]> {
    const packageIdUniqueId = new UniqueEntityId(packageId)
    return this.items.filter((item) =>
      item.packageItemId.equals(packageIdUniqueId),
    )
  }
}
