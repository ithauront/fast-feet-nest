import { BasicEntityProps, Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface RecipientProps extends BasicEntityProps {
  name: string
  email: string
  address: string
}

export class Recipient extends Entity<RecipientProps> {
  static create(props: RecipientProps, id?: UniqueEntityId) {
    const recipient = new Recipient(props, id)
    return recipient
  }

  get name() {
    return this.props.name
  }

  set email(newEmail: string) {
    this.props.email = newEmail
    this.touch()
  } // since the recipient is not someone on the company is possible that his email could change, and an Admin have permission to do it.

  get email() {
    return this.props.email
  }

  set address(newAddress: string) {
    this.props.address = newAddress
    this.touch()
  } // the recipient might want to change address, and an Admin have permission to do it.

  get address() {
    return this.props.address
  }
}
