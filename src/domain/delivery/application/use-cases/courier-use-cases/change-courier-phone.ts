import { Either, left, right } from '@/core/either'
import { Courier } from '@/domain/delivery/enterprise/entities/courier'
import { CourierRepository } from '../../repositories/courier-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { AuthorizationService } from '../../services/authorization'
import { Injectable } from '@nestjs/common'

interface ChangeCourierPhoneUseCaseRequest {
  creatorId: string
  courierId: string
  phone: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type ChangeCourierPhoneUseCaseResponse = Either<
  AuthorizationError | UserNotFoundError,
  Courier
>

@Injectable()
export class ChangeCourierPhoneUseCase {
  constructor(
    private courierRepository: CourierRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    courierId,
    phone,
  }: ChangeCourierPhoneUseCaseRequest): Promise<ChangeCourierPhoneUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const courier = await this.courierRepository.findById(courierId)

    if (!courier) {
      return left(new UserNotFoundError())
    }
    courier.phone = phone

    await this.courierRepository.save(courier)
    return right(courier)
  }
}
