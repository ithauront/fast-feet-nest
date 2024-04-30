import { BasicEntityProps, Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface EmailProps extends BasicEntityProps {
  recipientEmail: string
  subject: string
  body: string
  sentAt?: Date
}

export class Email extends Entity<EmailProps> {
  get recipientEmail() {
    return this.props.recipientEmail
  }

  get subject() {
    return this.props.subject
  }

  get body() {
    return this.props.body
  }

  get sentAt() {
    return this.props.sentAt
  }

  static create(
    props: Optional<EmailProps, 'sentAt'>,
    id?: UniqueEntityId,
  ): Email {
    const email = new Email(
      {
        ...props,
        sentAt: props.sentAt ?? new Date(),
      },
      id,
    )
    return email
  }
}
