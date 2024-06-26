import { Either, left, right } from '@/core/either'
import { Courier } from '../../../enterprise/entities/courier'
import { CourierRepository } from '../../repositories/courier-repository'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { AuthorizationService } from '../../services/authorization'
import { Injectable } from '@nestjs/common'

interface MarkCourierAsActiveUseCaseRequest {
  creatorId: string
  courierId: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type MarkCourierAsActiveUseCaseResponse = Either<
  AuthorizationError | UserNotFoundError,
  Courier
>

@Injectable()
export class MarkCourierAsActiveUseCase {
  constructor(
    private courierRepository: CourierRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    courierId,
  }: MarkCourierAsActiveUseCaseRequest): Promise<MarkCourierAsActiveUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }
    const courier = await this.courierRepository.findById(courierId)

    if (!courier) {
      return left(new UserNotFoundError())
    }
    courier.markAsActive()

    await this.courierRepository.save(courier)
    return right(courier)
  }
}
