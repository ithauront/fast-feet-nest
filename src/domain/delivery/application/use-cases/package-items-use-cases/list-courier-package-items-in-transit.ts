// we already had a useCase that list all courier package items, in theory we could dispose of this ListCourierPackageItemInTransituseCase and have this filter made in the front end. It would siplify the back end and decrease the number of useCases. But since the implemantation of this filter on the backend is not to complicated and considering that the list of all the package items of a courier could became extensive in a short time of use of the application, I consider that the performace gain of not sending all the data to the front end each time and letting he process the information could be a better solution.

import { Either, left, right } from '@/core/either'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { AuthorizationService } from '../../../application/services/authorization'
import { PackageStatus } from '../../../enterprise/entities/package-item'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { QueryParams } from '@/core/repositories/query-params'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'
import { Injectable } from '@nestjs/common'

interface ListCourierPackageItemInTransitUseCaseRequest {
  page: number
  creatorId: string
  courierId: string
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type ListCourierPackageItemInTransitUseCaseResponse = Either<
  AuthorizationError,
  {
    packageItems: PackageItemWithDetails[]
  }
>

@Injectable()
export class ListCourierPackageItemInTransitUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    courierId,
    page,
  }: ListCourierPackageItemInTransitUseCaseRequest): Promise<ListCourierPackageItemInTransitUseCaseResponse> {
    if (courierId !== creatorId) {
      const authorizationResult =
        await this.authorizationService.authorize(creatorId)

      if (authorizationResult?.isLeft()) {
        return left(authorizationResult.value)
      }
    }
    const queryParams: QueryParams = {
      page,
      status: PackageStatus.IN_TRANSIT,
    }
    const courierPackageItemsInTransit =
      await this.packageItemRepository.findManyByParamsAndCourierId(
        queryParams,
        courierId,
      )

    return right({ packageItems: courierPackageItemsInTransit })
  }
}
