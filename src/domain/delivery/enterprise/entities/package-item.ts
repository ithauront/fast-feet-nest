import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AggregateRoot } from '@/core/entities/aggregated-root'
import { PackageItemAttachmentList } from './package-item-attachment-list'
import { BasicEntityProps } from '@/core/entities/entity'
import { PackageItemStatusChangeEvent } from '../events/package-item-status-change'

export enum PackageStatus {
  AWAITING_PICKUP = 'Awaiting Pickup',
  IN_TRANSIT = 'In Transit',
  DELIVERED = 'Delivered',
  RETURNED = 'Returned',
  LOST = 'Lost',
}
export interface PackageItemProps extends BasicEntityProps {
  title: string
  deliveryAddress: string
  courierId?: UniqueEntityId | null
  recipientId: UniqueEntityId
  status: PackageStatus
  attachment: PackageItemAttachmentList
}

export class PackageItem extends AggregateRoot<PackageItemProps> {
  static create(
    props: Optional<PackageItemProps, 'courierId' | 'status' | 'attachment'>,
    id?: UniqueEntityId,
  ) {
    const packageItem = new PackageItem(
      {
        ...props,
        status: props.status ?? PackageStatus.AWAITING_PICKUP,
        courierId: props.courierId ?? null,
        attachment: props.attachment ?? new PackageItemAttachmentList(),
      },
      id,
    )
    return packageItem
  }

  get title() {
    return this.props.title
  }

  get deliveryAddress() {
    return this.props.deliveryAddress
  }

  set courierId(newCourier: UniqueEntityId) {
    this.props.courierId = newCourier
    this.touch()
  }

  get courierId(): UniqueEntityId | null {
    return this.props.courierId ?? null
  }

  get recipientId() {
    return this.props.recipientId
  }

  get status() {
    return this.props.status
  }

  get attachment() {
    return this.props.attachment
  }

  set attachment(attachment: PackageItemAttachmentList) {
    this.props.attachment = attachment
  }

  markAsInTransit(modifiedBy: UniqueEntityId) {
    const previousStatus = this.props.status
    this.props.status = PackageStatus.IN_TRANSIT

    this.addDomainEvent(
      new PackageItemStatusChangeEvent(this, modifiedBy, previousStatus),
    )
    this.touch()
  }

  markAsDelivered(modifiedBy: UniqueEntityId) {
    const previousStatus = this.props.status
    this.props.status = PackageStatus.DELIVERED
    this.addDomainEvent(
      new PackageItemStatusChangeEvent(this, modifiedBy, previousStatus),
    )
    this.touch()
  }

  markAsReturned(modifiedBy: UniqueEntityId) {
    const previousStatus = this.props.status
    this.props.status = PackageStatus.RETURNED
    this.addDomainEvent(
      new PackageItemStatusChangeEvent(this, modifiedBy, previousStatus),
    )
    this.touch()
  }

  markAsLost(modifiedBy: UniqueEntityId) {
    const previousStatus = this.props.status
    this.props.status = PackageStatus.LOST
    this.addDomainEvent(
      new PackageItemStatusChangeEvent(this, modifiedBy, previousStatus),
    )
    this.touch()
  }
}
