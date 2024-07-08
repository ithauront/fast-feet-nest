import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'

export abstract class PackageItemAttachmentRepository {
  abstract createMany(attachments: PackageItemAttachment[]): Promise<void>
  abstract deleteMany(attachments: PackageItemAttachment[]): Promise<void>
  abstract findManyByPackageItemId(
    packageId: string,
  ): Promise<PackageItemAttachment[]>

  abstract deleteManyByPackageItemId(packageItemId: string): Promise<void>
}
