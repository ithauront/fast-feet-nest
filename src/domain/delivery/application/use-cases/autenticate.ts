import { Either, left, right } from '@/core/either'
import { Courier, CourierStatus } from '../../enterprise/entities/courier'
import { CourierRepository } from '../repositories/courier-repository'
import { AdminRepository } from '../repositories/admin-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { Admin } from '../../enterprise/entities/admin'
import { HashComparer } from '../cryptography/hash-comparer'
import { Encrypter } from '../cryptography/encrypter'
import { InvalidActionError } from './errors/invalid-action-error'

interface AutenticateUseCaseRequest {
  cpf: string
  password: string
}

type AutenticateUseCaseResponse = Either<
  InvalidCredentialsError,
  {
    accessToken: string
  }
>

export class AutenticateUseCase {
  constructor(
    private courierRepository: CourierRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
    private adminRepository: AdminRepository,
  ) {}

  async execute({
    cpf,
    password,
  }: AutenticateUseCaseRequest): Promise<AutenticateUseCaseResponse> {
    let user: Courier | Admin | null =
      await this.courierRepository.findByCpf(cpf)

    if (!user) {
      user = await this.adminRepository.findByCpf(cpf)
    }

    if (!user) {
      user = await this.adminRepository.findByCpf(cpf)
    }

    if (!user) {
      return left(new InvalidCredentialsError())
    }

    if (!(await user.verifyPassword(password, this.hashComparer))) {
      return left(new InvalidCredentialsError())
    }

    const isActive =
      user instanceof Courier
        ? user.status === CourierStatus.ACTIVE
        : user.isActive

    if (!isActive) {
      return left(new InvalidActionError('User is not active'))
    }

    const accessToken = await this.encrypter.encrypt(
      {
        sub: user.id.toString(),
      },
      '1h',
    )

    return right({ accessToken })
  }
}
