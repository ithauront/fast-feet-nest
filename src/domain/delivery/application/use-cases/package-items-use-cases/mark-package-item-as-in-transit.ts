import { Either, left, right } from '@/core/either'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item'
import { AuthorizationService } from '../../services/authorization'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface MarkPackageItemAsInTransitUseCaseRequest {
  creatorId: string
  packageItemId: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type MarkPackageItemAsInTransitUseCaseResponse = Either<
  AuthorizationError | PackageItemNotFoundError,
  PackageItem
>

export class MarkPackageItemAsInTransitUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    packageItemId,
  }: MarkPackageItemAsInTransitUseCaseRequest): Promise<MarkPackageItemAsInTransitUseCaseResponse> {
    const packageItem = await this.packageItemRepository.findById(packageItemId)
    if (!packageItem) {
      return left(new PackageItemNotFoundError())
    }

    if (packageItem.courierId?.toString() !== creatorId) {
      const authorizationResult =
        await this.authorizationService.authorize(creatorId)

      if (authorizationResult?.isLeft()) {
        return left(authorizationResult.value)
      }
    }

    packageItem.markAsInTransit(new UniqueEntityId(creatorId))

    await this.packageItemRepository.save(packageItem)
    return right(packageItem)
  }
}
