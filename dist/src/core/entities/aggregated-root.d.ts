import { DomainEvent } from '../events/domain-event';
import { BasicEntityProps, Entity } from './entity';
export declare class AggregateRoot<Props extends BasicEntityProps> extends Entity<Props> {
    private _domaineEvents;
    get domainEvents(): DomainEvent[];
    protected addDomainEvent(domainEvent: DomainEvent): void;
    clearEvents(): void;
}
