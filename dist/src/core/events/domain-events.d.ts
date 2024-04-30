import { AggregateRoot } from '../entities/aggregated-root';
import { UniqueEntityId } from '../entities/unique-entity-id';
import { DomainEvent } from './domain-event';
type DomainEventCallback = (event: any) => void;
export declare class DomainEvents {
    private static handlersMap;
    private static markedAggregates;
    static markAggregateForDispatch(aggregate: AggregateRoot<any>): void;
    private static dispatchAggregateEvents;
    private static removeAggregateFromMarkedDispatchList;
    private static findMarkedAggregateByID;
    static dispatchEventsForAggregate(id: UniqueEntityId): void;
    static register(callback: DomainEventCallback, eventClassName: string): void;
    static clearHandlers(): void;
    static clearMarkedAggregates(): void;
    static dispatch(event: DomainEvent): void;
}
export {};
