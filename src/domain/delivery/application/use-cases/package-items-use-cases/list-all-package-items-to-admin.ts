import { Either, left, right } from '@/core/either'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { AuthorizationService } from '../../../application/services/authorization'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'

interface ListAllPackageItemsToAdminUseCaseRequest {
  page: number
  creatorId: string
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type ListAllPackageItemsToAdminUseCaseResponse = Either<
  AuthorizationError,
  {
    packageItems: PackageItemWithDetails[]
  }
>

export class ListAllPackageItemsToAdminUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    page,
  }: ListAllPackageItemsToAdminUseCaseRequest): Promise<ListAllPackageItemsToAdminUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)
    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const allPackageItems = await this.packageItemRepository.findManyByParams({
      page,
    })

    return right({ packageItems: allPackageItems })
  }
}
