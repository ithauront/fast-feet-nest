import { Either, left, right } from '@/core/either'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InvalidActionError } from '../errors/invalid-action-error'
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item'
import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'
import { PackageItemAttachmentList } from '@/domain/delivery/enterprise/entities/package-item-attachment-list'

interface MarkPackageItemAsDeliveredUseCaseRequest {
  creatorId: string
  packageItemId: string
  attachmentIds: string[]
}

type MarkPackageItemAsDeliveredUseCaseResponse = Either<
  UnauthorizedAdminError | PackageItemNotFoundError | InvalidActionError,
  PackageItem
>

export class MarkPackageItemAsDeliveredUseCase {
  constructor(private packageItemRepository: PackageItemRepository) {}

  async execute({
    creatorId,
    packageItemId,
    attachmentIds,
  }: MarkPackageItemAsDeliveredUseCaseRequest): Promise<MarkPackageItemAsDeliveredUseCaseResponse> {
    const packageItem = await this.packageItemRepository.findById(packageItemId)
    if (!packageItem) {
      return left(new PackageItemNotFoundError())
    }

    if (packageItem.courierId?.toString() !== creatorId) {
      return left(
        new UnauthorizedAdminError(
          'Only the courier assigned to the package item can mark it as delivered',
        ),
      )
    }
    if (attachmentIds.length === 0) {
      return left(
        new InvalidActionError(
          'At least one attachment must be provided when marking the package as delivered',
        ),
      )
    }
    const packageItemAttachment = attachmentIds.map((attachmentId) => {
      return PackageItemAttachment.create({
        packageItemId: packageItem.id,
        attachmentId: new UniqueEntityId(attachmentId),
        isImmutable: true,
      })
    })
    packageItem.attachment = new PackageItemAttachmentList(
      packageItemAttachment,
    )
    packageItem.markAsDelivered(new UniqueEntityId(creatorId))

    await this.packageItemRepository.save(packageItem)
    return right(packageItem)
  }
}
