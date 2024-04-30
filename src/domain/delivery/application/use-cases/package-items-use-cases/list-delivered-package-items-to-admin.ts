// we already had a useCase that list all courier package item, in theory we could dispose of this ListDeliveredPackageItemToAdminUseCase and have this filter made in the front end. It would siplify the back end and decrease the number of useCases. But since the implemantation of this filter on the backend is not to complicated and considering that the list of all the package item of a courier could became extensive in a short time of use of the application, I consider that the performace gain of not sending all the data to the front end each time and letting he process the information could be a better solution.

import { Either, left, right } from '@/core/either'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { AuthorizationService } from '../../../application/services/authorization'
import { PackageStatus } from '../../../enterprise/entities/package-item'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { QueryParams } from '@/core/repositories/query-params'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'

interface ListDeliveredPackageItemToAdminUseCaseRequest {
  page: number
  creatorId: string
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type ListDeliveredPackageItemToAdminUseCaseResponse = Either<
  AuthorizationError,
  {
    packageItems: PackageItemWithDetails[]
  }
>

export class ListDeliveredPackageItemToAdminUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    page,
  }: ListDeliveredPackageItemToAdminUseCaseRequest): Promise<ListDeliveredPackageItemToAdminUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }
    const queryParams: QueryParams = {
      page,
      status: PackageStatus.DELIVERED,
    }
    const courierPackageItemInTransit =
      await this.packageItemRepository.findManyByParams(queryParams)

    return right({ packageItems: courierPackageItemInTransit })
  }
}
