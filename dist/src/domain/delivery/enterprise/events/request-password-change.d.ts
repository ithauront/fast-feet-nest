import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { DomainEvent } from '@/core/events/domain-event';
export declare class RequestPasswordChangeEvent implements DomainEvent {
    ocurredAt: Date;
    userId: UniqueEntityId;
    userEmail: string;
    accessToken: string;
    constructor(userId: UniqueEntityId, userEmail: string, accessToken: string);
    getAggregateId(): UniqueEntityId;
}
