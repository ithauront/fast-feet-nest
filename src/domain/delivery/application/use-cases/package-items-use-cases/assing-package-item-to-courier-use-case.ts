import { Either, left, right } from '@/core/either'
import { PackageItem } from '../../../enterprise/entities/package-item'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { AuthorizationService } from '../../services/authorization'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface AssingPackageItemToCourierUseCaseRequest {
  creatorId: string
  packageId: string
  courierId: string
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type AssingPackageItemToCourierUseCaseResponse = Either<
  AuthorizationError | PackageItemNotFoundError,
  PackageItem
>
export class AssingPackageItemToCourierUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    packageId,
    courierId,
  }: AssingPackageItemToCourierUseCaseRequest): Promise<AssingPackageItemToCourierUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const packageItem = await this.packageItemRepository.findById(packageId)
    if (!packageItem) {
      return left(new PackageItemNotFoundError())
    }
    packageItem.courierId = new UniqueEntityId(courierId)

    return right(packageItem)
  }
}
