// This useCase depends on the creation of an uniqueAcessToken by a requestPasswordChangeUseCase that will send an email to the user. The changing of the password should only be accessed by the link sent to the user email containing the uniqueAccessToken.

import { Either, left, right } from '@/core/either'
import { Courier } from '../../enterprise/entities/courier'
import { CourierRepository } from '../repositories/courier-repository'
import { AdminRepository } from '../repositories/admin-repository'
import { Admin } from '../../enterprise/entities/admin'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { DomainEvents } from '@/core/events/domain-events'
import { RequestPasswordChangeEvent } from '../../enterprise/events/request-password-change'
import { Encrypter } from '../cryptography/encrypter'
import { Injectable } from '@nestjs/common'

interface RequestPasswordChangeUseCaseRequest {
  userEmail: string
}

type RequestPasswordChangeUseCaseResponse = Either<
  InvalidCredentialsError,
  { message: string }
>

@Injectable()
export class RequestPasswordChangeUseCase {
  constructor(
    private courierRepository: CourierRepository,
    private adminRepository: AdminRepository,
    private encrypter: Encrypter,
  ) {}

  async execute({
    userEmail,
  }: RequestPasswordChangeUseCaseRequest): Promise<RequestPasswordChangeUseCaseResponse> {
    let user: Courier | Admin | null =
      await this.courierRepository.findByEmail(userEmail)
    if (!user) {
      user = await this.adminRepository.findByEmail(userEmail)
    }
    if (!user) {
      return left(new InvalidCredentialsError())
    }

    const expiresIn = '1h'

    const payload = {
      sub: user.id,
    }

    const uniqueAccessToken = await this.encrypter.encrypt(payload, expiresIn)
    const event = new RequestPasswordChangeEvent(
      user.id,
      user.email,
      uniqueAccessToken,
    )

    DomainEvents.dispatch(event)

    return right({
      message: 'Password change email has been sent successfully',
    })
  }
}
