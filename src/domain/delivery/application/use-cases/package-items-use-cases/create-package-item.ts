import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PackageItem } from '../../../enterprise/entities/package-item'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { Either, left, right } from '@/core/either'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { AuthorizationService } from '../../services/authorization'

interface CreatePackageItemUseCaseRequest {
  creatorId: string
  title: string
  deliveryAddress: string
  recipientId: string
  courierId?: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type CreatePackageItemUseCaseResponse = Either<AuthorizationError, PackageItem>

export class CreatePackageItemUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    title,
    deliveryAddress,
    recipientId,
    courierId,
  }: CreatePackageItemUseCaseRequest): Promise<CreatePackageItemUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const optionalCourierId = courierId ? new UniqueEntityId(courierId) : null

    const packageItem = PackageItem.create({
      title,
      deliveryAddress,
      recipientId: new UniqueEntityId(recipientId),
      courierId: optionalCourierId,
    })

    await this.packageItemRepository.create(packageItem)
    return right(packageItem)
  }
}
