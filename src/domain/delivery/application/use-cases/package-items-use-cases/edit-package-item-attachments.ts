// We don’t have any instructions about the editing of attachments since attachments are only mentioned on the photo to mark the package item as delivered. I chose to enable the recipient to add attachments to the package item once it's already been delivered in a way to review the concepts of the watched list and others. The idea is that the recipient can upload photos of the package and conditions of the product upon opening the package. Recipients don't have a login but have access to the package ID, and this is not a case where some other person might profit from editing an attachment to a package that's already been delivered, so I kept it without authentication and considered that access to the Package Item ID was enough.

import { Either, left, right } from '@/core/either'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { PackageItemAttachmentRepository } from '../../repositories/package-item-attachment-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PackageItemAttachmentList } from '@/domain/delivery/enterprise/entities/package-item-attachment-list'
import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'
import {
  PackageItem,
  PackageStatus,
} from '@/domain/delivery/enterprise/entities/package-item'

interface EditPackageItemAttachmentUseCaseRequest {
  packageItemId: string
  attachmentIds: string[]
}
type EditPackageItemAttachmentUseCaseResponse = Either<
  PackageItemNotFoundError,
  PackageItem
>

export class EditPackageItemAttachmentUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private packageItemAttachmentRepository: PackageItemAttachmentRepository,
  ) {}

  async execute({
    packageItemId,
    attachmentIds,
  }: EditPackageItemAttachmentUseCaseRequest): Promise<EditPackageItemAttachmentUseCaseResponse> {
    const packageItem = await this.packageItemRepository.findById(packageItemId)

    if (!packageItem) {
      return left(new PackageItemNotFoundError())
    }
    if (packageItem.status !== PackageStatus.DELIVERED) {
      return left(
        new PackageItemNotFoundError(
          'The package has not been delivered yet. Please wait until you have the package in your hands before uploading any feedback.',
        ),
      )
    }

    const currentPackageItemAttachments =
      await this.packageItemAttachmentRepository.findByPackageItemId(
        packageItemId,
      )

    const packageItemAttachmentList = new PackageItemAttachmentList(
      currentPackageItemAttachments,
    )

    const attachments = attachmentIds.map((attachmentId) => {
      return PackageItemAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        packageItemId: packageItem.id,
      })
    })

    packageItemAttachmentList.update(attachments)

    packageItem.attachment = packageItemAttachmentList

    await this.packageItemRepository.save(packageItem)

    return right(packageItem)
  }
}
