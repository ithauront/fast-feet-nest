import { BasicEntityProps, Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { HashComparer } from '../../application/cryptography/hash-comparer'

export interface AdminProps extends BasicEntityProps {
  name: string
  email: string
  cpf: string
  password: string
  isActive: boolean
}

export class Admin extends Entity<AdminProps> {
  static create(props: Optional<AdminProps, 'isActive'>, id?: UniqueEntityId) {
    const admin = new Admin({ ...props, isActive: props.isActive ?? true }, id)
    return admin
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

  get isAdmin() {
    return true
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

  set isActive(isActive: boolean) {
    this.props.isActive = isActive
    this.touch()
  }

  get isActive() {
    return this.props.isActive
  }
}
