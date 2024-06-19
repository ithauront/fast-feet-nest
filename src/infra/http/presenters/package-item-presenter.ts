import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'

export class PackageItemPresenter {
  static toHTTP(packageItem: PackageItemWithDetails) {
    return {
      id: packageItem.packageItemId.toString(),
      title: packageItem.title,
      status: packageItem.status,
      courierId: packageItem.courierId?.toString(),
      deliveryAddress: packageItem.deliveryAddress,
      recipientId: packageItem.recipientId.toString(),
      createdAt: packageItem.createdAt,
      updatedAt: packageItem.updatedAt,
      attachments: packageItem.attachments,
    }
  }
}
