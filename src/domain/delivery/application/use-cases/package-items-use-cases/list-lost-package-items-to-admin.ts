import { Either, left, right } from '@/core/either'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { AuthorizationService } from '../../../application/services/authorization'
import { PackageStatus } from '../../../enterprise/entities/package-item'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { QueryParams } from '@/core/repositories/query-params'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'

interface ListLostPackageItemToAdminUseCaseRequest {
  page: number
  creatorId: string
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type ListLostPackageItemToAdminUseCaseResponse = Either<
  AuthorizationError,
  {
    packageItems: PackageItemWithDetails[]
  }
>

export class ListLostPackageItemToAdminUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    page,
  }: ListLostPackageItemToAdminUseCaseRequest): Promise<ListLostPackageItemToAdminUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }
    const queryParams: QueryParams = {
      page,
      status: PackageStatus.LOST,
    }
    const courierPackageItemsLost =
      await this.packageItemRepository.findManyByParams(queryParams)

    return right({ packageItems: courierPackageItemsLost })
  }
}
