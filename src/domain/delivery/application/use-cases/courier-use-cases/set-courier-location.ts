import { Either, left, right } from '@/core/either'
import { Courier } from '../../../enterprise/entities/courier'
import { CourierRepository } from '../../repositories/courier-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { GeoLocationProvider } from '../../services/geo-locationProvider'

interface SetCourierLocationUseCaseRequest {
  creatorId: string
  ip: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type SetCourierLocationUseCaseResponse = Either<
  AuthorizationError | UserNotFoundError,
  Courier
>

export class SetCourierLocationUseCase {
  constructor(
    private courierRepository: CourierRepository,
    private geoLocationProvider: GeoLocationProvider,
  ) {}

  async execute({
    creatorId,
    ip,
  }: SetCourierLocationUseCaseRequest): Promise<SetCourierLocationUseCaseResponse> {
    const courier = await this.courierRepository.findById(creatorId)

    if (!courier) {
      return left(new UserNotFoundError())
    }
    const geoLocation = await this.geoLocationProvider.getGeoLocationFromIp(ip)
    courier.setLocation(geoLocation.latitude, geoLocation.longitude)

    await this.courierRepository.save(courier)
    return right(courier)
  }
}
