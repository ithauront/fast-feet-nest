// This useCase depends on the creation of an uniqueAcessToken by a requestPasswordChangeUseCase that will send an email to the user. The changing of the password should only be accessed by the link sent to the user email containing the uniqueAccessToken.

import { Either, left, right } from '@/core/either'
import { Courier } from '../../enterprise/entities/courier'
import { CourierRepository } from '../repositories/courier-repository'
import { AdminRepository } from '../repositories/admin-repository'
import { Admin } from '../../enterprise/entities/admin'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { HashGenerator } from '../cryptography/hash-generator'
import { DecryptedTokenPayload, Encrypter } from '../cryptography/encrypter'
import { TokenExpiredError } from './errors/token-expired-error'

interface ChangePasswordUseCaseRequest {
  uniqueAccessToken: string
  newPassword: string
}

type ChangePasswordUseCaseResponse = Either<
  InvalidCredentialsError | TokenExpiredError,
  { message: string }
>

export class ChangePasswordUseCase {
  constructor(
    private courierRepository: CourierRepository,
    private adminRepository: AdminRepository,
    private encrypter: Encrypter,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    uniqueAccessToken,
    newPassword,
  }: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse> {
    let payload: DecryptedTokenPayload
    try {
      payload = await this.encrypter.decrypt(uniqueAccessToken)
    } catch (error) {
      return left(new InvalidCredentialsError())
    }

    const currentTime = Math.floor(Date.now() / 1000)
    if (payload.exp < currentTime) {
      return left(new TokenExpiredError())
    }

    let user: Courier | Admin | null = await this.courierRepository.findById(
      payload.sub,
    )

    if (!user) {
      user = await this.adminRepository.findById(payload.sub)
    }

    if (!user) {
      return left(new InvalidCredentialsError())
    }

    const hashedPassword = await this.hashGenerator.hash(newPassword)

    user.password = hashedPassword

    if (user instanceof Admin) {
      await this.adminRepository.save(user)
    } else {
      await this.courierRepository.save(user)
    }

    return right({ message: 'Password changed successfully' })
  }
}
