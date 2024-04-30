import { Either, left, right } from '@/core/either'
import { Courier } from '../../../enterprise/entities/courier'
import { CourierRepository } from '../../repositories/courier-repository'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { AuthorizationService } from '../../services/authorization'

interface MarkCourierAsOnVacationUseCaseRequest {
  creatorId: string
  courierId: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type MarkCourierAsOnVacationUseCaseResponse = Either<
  AuthorizationError | UserNotFoundError,
  Courier
>

export class MarkCourierAsOnVacationUseCase {
  constructor(
    private courierRepository: CourierRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    courierId,
  }: MarkCourierAsOnVacationUseCaseRequest): Promise<MarkCourierAsOnVacationUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const courier = await this.courierRepository.findById(courierId)

    if (!courier) {
      return left(new UserNotFoundError())
    }
    courier.markAsOnVacation()

    await this.courierRepository.save(courier)
    return right(courier)
  }
}
