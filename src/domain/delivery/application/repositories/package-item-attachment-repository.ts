import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'

export interface PackageItemAttachmentRepository {
  findByPackageItemId(packageId: string): Promise<PackageItemAttachment[]>
}
