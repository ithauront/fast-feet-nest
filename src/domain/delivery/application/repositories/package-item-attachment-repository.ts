import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'

export abstract class PackageItemAttachmentRepository {
  abstract findByPackageItemId(
    packageId: string,
  ): Promise<PackageItemAttachment[]>
}
