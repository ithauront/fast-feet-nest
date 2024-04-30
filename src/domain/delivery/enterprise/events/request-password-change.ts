import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'

export class RequestPasswordChangeEvent implements DomainEvent {
  public ocurredAt: Date
  public userId: UniqueEntityId
  public userEmail: string
  public accessToken: string

  constructor(userId: UniqueEntityId, userEmail: string, accessToken: string) {
    this.userId = userId
    this.userEmail = userEmail
    this.accessToken = accessToken
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.userId
  }
}
