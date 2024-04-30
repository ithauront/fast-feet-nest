import { DomainEvent } from '../events/domain-event'
import { DomainEvents } from '../events/domain-events'
import { BasicEntityProps, Entity } from './entity'

export class AggregateRoot<
  Props extends BasicEntityProps,
> extends Entity<Props> {
  private _domaineEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domaineEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domaineEvents.push(domainEvent)
    DomainEvents.markAggregateForDispatch(this)
  }

  public clearEvents() {
    this._domaineEvents = []
  }
}
