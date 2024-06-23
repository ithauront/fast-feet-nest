import { Either, left, right } from '@/core/either'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InvalidActionError } from '../errors/invalid-action-error'
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item'
import { PackageItemAttachment } from '@/domain/delivery/enterprise/entities/package-item-attachment'
import { PackageItemAttachmentList } from '@/domain/delivery/enterprise/entities/package-item-attachment-list'
import { AttachmentsRepository } from '../../repositories/attachment-repository'
import { Injectable } from '@nestjs/common'

interface MarkPackageItemAsDeliveredUseCaseRequest {
  creatorId: string
  packageItemId: string
  attachmentIds: string[]
}

type MarkPackageItemAsDeliveredUseCaseResponse = Either<
  UnauthorizedAdminError | PackageItemNotFoundError | InvalidActionError,
  PackageItem
>

@Injectable()
export class MarkPackageItemAsDeliveredUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private attachmentRepository: AttachmentsRepository,
  ) {}

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
        packageItemId: packageItem.id,
        attachmentId: new UniqueEntityId(attachmentIds[index]),
        isImmutable: true,
        attachment,
      })
    })

    packageItem.attachment = new PackageItemAttachmentList(
      packageItemAttachments,
    )
    packageItem.markAsDelivered(new UniqueEntityId(creatorId))

    await this.packageItemRepository.save(packageItem)
    return right(packageItem)
  }
}
