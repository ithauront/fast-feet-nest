// only the courier himself can set his location
import { Either, left, right } from '@/core/either'
import { Courier } from '../../../enterprise/entities/courier'
import { CourierRepository } from '../../repositories/courier-repository'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { GeoLocationProvider } from '../../services/geo-locationProvider'
import { Injectable } from '@nestjs/common'

interface SetCourierLocationUseCaseRequest {
  creatorId: string
  ip: string
}

type SetCourierLocationUseCaseResponse = Either<UserNotFoundError, Courier>

@Injectable()
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
    console.log('useCase ip', ip)
    const geoLocation = await this.geoLocationProvider.getGeoLocationFromIp(ip)
    courier.setLocation(geoLocation.latitude, geoLocation.longitude)

    await this.courierRepository.save(courier)
    return right(courier)
  }
}
