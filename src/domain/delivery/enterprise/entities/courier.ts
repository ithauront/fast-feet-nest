import { BasicEntityProps, Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { GeoLocation } from './value-object/geolocation'
import { HashComparer } from '../../application/cryptography/hash-comparer'

export enum CourierStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_VACATION = 'ON_VACATION',
  DISMISSED = 'DISMISSED',
}

export interface CourierProps extends BasicEntityProps {
  name: string
  email: string
  cpf: string
  password: string
  location?: GeoLocation | null
  isAdmin: boolean
  status: CourierStatus
  phone: string
}

export class Courier extends Entity<CourierProps> {
  static create(
    props: Optional<CourierProps, 'isAdmin' | 'status'>,
    id?: UniqueEntityId,
  ) {
    const courier = new Courier(
      {
        ...props,
        isAdmin: props.isAdmin ?? false,
        status: props.status ?? CourierStatus.ACTIVE,
      },
      id,
    )
    return courier
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  } // did not made a set email because since the idea is to simulate a company the email sould be a company email and dont need to be altered

  get cpf() {
    return this.props.cpf
  }

  setLocation(latitude: number, longitude: number) {
    this.props.location = new GeoLocation(latitude, longitude)
    this.touch()
  }

  get location(): GeoLocation | null {
    return this.props.location ?? null
  }

  set isAdmin(isAdmin: boolean) {
    this.props.isAdmin = isAdmin
    this.touch()
  }

  get isAdmin() {
    return this.props.isAdmin
  }

  get status() {
    return this.props.status
  }

  set phone(newPhone: string) {
    this.props.phone = newPhone
    this.touch()
  } // diferent from email phone number usually came from external service and are more suceptible to change.

  get phone() {
    return this.props.phone
  }

  // eslint-disable-next-line accessor-pairs
  set password(hashedPassword: string) {
    this.props.password = hashedPassword
    this.touch()
  }

  verifyPassword(
    inputPassword: string,
    hashComparer: HashComparer,
  ): Promise<boolean> {
    return hashComparer.compare(inputPassword, this.props.password)
  }

  markAsActive() {
    this.props.status = CourierStatus.ACTIVE
    this.touch()
  }

  markAsInactive() {
    this.props.status = CourierStatus.INACTIVE
    this.touch()
  }

  markAsOnVacation() {
    this.props.status = CourierStatus.ON_VACATION
    this.touch()
  }

  markAsDismissed() {
    this.props.status = CourierStatus.DISMISSED
    this.touch()
  }
}
