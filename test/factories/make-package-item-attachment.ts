import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  PackageItemAttachment,
  PackageItemAttachmentProps,
} from '@/domain/delivery/enterprise/entities/package-item-attachment'
import { makeAttachment } from './make-attachment'

const attachment = makeAttachment()
export function makePackageItemAttachments(
  override: Partial<PackageItemAttachmentProps> = {},
  id?: UniqueEntityId,
) {
  const { createdAt, ...safeOverride } = override
  const packageItemAttachments = PackageItemAttachment.create(
    {
      packageItemId: new UniqueEntityId(),
      attachmentId: new UniqueEntityId(),
      ...safeOverride,
      createdAt: createdAt ?? new Date(),
      attachment,
    },
    id,
  )

  return packageItemAttachments
}
