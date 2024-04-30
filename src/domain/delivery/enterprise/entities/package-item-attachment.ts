import { BasicEntityProps, Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface PackageItemAttachmentProps extends BasicEntityProps {
  packageItemId: UniqueEntityId
  attachmentId: UniqueEntityId
  isImmutable?: boolean
}

export class PackageItemAttachment extends Entity<PackageItemAttachmentProps> {
  get packageItemId() {
    return this.props.packageItemId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  get isImmutable() {
    return this.props.isImmutable || false
  }

  static create(
    props: Optional<PackageItemAttachmentProps, 'isImmutable'>,
    id?: UniqueEntityId,
  ) {
    const questionAttachment = new PackageItemAttachment(
      { ...props, isImmutable: props.isImmutable ?? false },
      id,
    )
    return questionAttachment
  }
}
