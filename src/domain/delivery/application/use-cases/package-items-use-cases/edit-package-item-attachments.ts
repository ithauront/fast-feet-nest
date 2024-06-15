import { Either, left, right } from '@/core/either'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { PackageItemAttachmentRepository } from '../../repositories/package-item-attachment-repository'
import { AttachmentsRepository } from '../../repositories/attachment-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PackageItemAttachmentList } from '@/domain/delivery/enterprise/entities/package-item-attachment-list'
import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'
import {
  PackageItem,
  PackageStatus,
} from '@/domain/delivery/enterprise/entities/package-item'
import { InvalidActionError } from '../errors/invalid-action-error'

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
    private attachmentRepository: AttachmentsRepository,
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

    const attachments = await Promise.all(
      attachmentIds.map((attachmentId) =>
        this.attachmentRepository.findById(attachmentId),
      ),
    )

    if (attachments.includes(null)) {
      return left(new InvalidActionError('Invalid attachment ID'))
    }

    const packageItemAttachments = attachments.map((attachment, index) => {
      if (!attachment) {
        throw new InvalidActionError('Invalid attachment ID')
      }
      return PackageItemAttachment.create({
        attachmentId: new UniqueEntityId(attachmentIds[index]),
        packageItemId: packageItem.id,
        attachment,
      })
    })

    packageItemAttachmentList.update(packageItemAttachments)

    packageItem.attachment = packageItemAttachmentList

    await this.packageItemRepository.save(packageItem)

    return right(packageItem)
  }
}
