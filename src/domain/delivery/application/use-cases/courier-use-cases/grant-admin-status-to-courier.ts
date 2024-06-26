import { Either, left, right } from '@/core/either'
import { Courier } from '../../../enterprise/entities/courier'
import { CourierRepository } from '../../repositories/courier-repository'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { AuthorizationService } from '../../services/authorization'
import { Injectable } from '@nestjs/common'

interface GrantAdminStatusToCourierUseCaseRequest {
  creatorId: string
  courierId: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type GrantAdminStatusToCourierUseCaseResponse = Either<
  AuthorizationError,
  Courier
>

@Injectable()
export class GrantAdminStatusToCourierUseCase {
  constructor(
    private courierRepository: CourierRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    courierId,
  }: GrantAdminStatusToCourierUseCaseRequest): Promise<GrantAdminStatusToCourierUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const courier = await this.courierRepository.findById(courierId)

    if (!courier) {
      return left(new UserNotFoundError())
    }
    courier.isAdmin = true

    await this.courierRepository.save(courier)
    return right(courier)
  }
}
