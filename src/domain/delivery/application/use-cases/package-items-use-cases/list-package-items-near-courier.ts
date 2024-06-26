import { Either, left, right } from '@/core/either'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { PackageStatus } from '../../../enterprise/entities/package-item'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { QueryParams } from '@/core/repositories/query-params'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { CourierRepository } from '../../repositories/courier-repository'
import { GeoLocationProvider } from '../../services/geo-locationProvider'
import { AuthorizationService } from '../../services/authorization'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'
import { Injectable } from '@nestjs/common'

interface ListPackageItemsNearCourierUseCaseRequest {
  page: number
  creatorId: string
  courierId: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type ListPackageItemsNearCourierUseCaseResponse = Either<
  AuthorizationError | UserNotFoundError,
  {
    packageItems: PackageItemWithDetails[]
  }
>

@Injectable()
export class ListPackageItemsNearCourierUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private courierRepository: CourierRepository,
    private geoLocationProvider: GeoLocationProvider,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    courierId,
    page,
  }: ListPackageItemsNearCourierUseCaseRequest): Promise<ListPackageItemsNearCourierUseCaseResponse> {
    if (courierId !== creatorId) {
      const authorizationResult =
        await this.authorizationService.authorize(creatorId)
      if (authorizationResult?.isLeft()) {
        return left(authorizationResult.value)
      }
    }

    const courier = await this.courierRepository.findById(courierId)
    if (!courier || !courier.location) {
      return left(new UserNotFoundError('Courier location not available'))
    }

    const queryParams: QueryParams = { page, status: PackageStatus.IN_TRANSIT }
    const courierPackageItems =
      await this.packageItemRepository.findManyByParamsAndCourierId(
        queryParams,
        courierId,
      )

    const distances = await Promise.all(
      courierPackageItems.map((item) =>
        this.geoLocationProvider
          .getGeoLocationFromAddress(item.deliveryAddress)
          .then((location) => courier.location!.getDistanceTo(location)),
      ),
    )

    const packageItemsWithDistances = courierPackageItems.map(
      (item, index) => ({
        item,
        distance: distances[index],
      }),
    )

    const packageItemsNearCourierSorted = packageItemsWithDistances
      .filter(({ distance }) => distance < 5)
      .sort((a, b) => a.distance - b.distance)
      .map(({ item }) => item)

    return right({ packageItems: packageItemsNearCourierSorted })
  }
}
