import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'
import { PackageStatus } from '../package-item'
import { Attachment } from '../attachment'

export interface PackageItemWithDetailsProps {
  packageItemId: UniqueEntityId
  courierId: UniqueEntityId | null
  recipientId: UniqueEntityId
  deliveryAddress: string
  title: string
  status: PackageStatus
  attachments: Attachment[]
  createdAt: Date
  updatedAt?: Date | null
}

export class PackageItemWithDetails extends ValueObject<PackageItemWithDetailsProps> {
  get packageItemId() {
    return this.props.packageItemId
  }

  get courierId() {
    return this.props.courierId
  }

  get recipientId() {
    return this.props.recipientId
  }

  get deliveryAddress() {
    return this.props.deliveryAddress
  }

  get title() {
    return this.props.title
  }

  get status() {
    return this.props.status
  }

  get attachments() {
    return this.props.attachments
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  static create(props: PackageItemWithDetailsProps) {
    return new PackageItemWithDetails(props)
  }
}
