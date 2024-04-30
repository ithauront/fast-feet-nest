import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PackageItemAttachmentRepository } from '@/domain/delivery/application/repositories/package-item-attachment-repository'
import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'

export class InMemoryPackageItemAttachmentRepository
  implements PackageItemAttachmentRepository
{
  public items: PackageItemAttachment[] = []

  async findByPackageItemId(
    packageId: string,
  ): Promise<PackageItemAttachment[]> {
    const packageIdUniqueId = new UniqueEntityId(packageId)
    return this.items.filter((item) =>
      item.packageItemId.equals(packageIdUniqueId),
    )
  }
}
