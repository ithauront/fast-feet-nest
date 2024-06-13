import { UniqueEntityId } from './unique-entity-id'

export interface BasicEntityProps {
  createdAt?: Date
  updatedAt?: Date | null
}

export class Entity<Props extends BasicEntityProps> {
  private _id: UniqueEntityId
  public props: Props

  get id() {
    return this._id
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  protected constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId()
    this.props = { ...props, createdAt: props.createdAt ?? new Date() }
  }

  public equals(entity: Entity<BasicEntityProps>) {
    if (entity === this) {
      return true
    }

    if (entity._id === this._id) {
      return true
    }

    return false
  }

  protected touch() {
    this.props.updatedAt = new Date()
  }
}
