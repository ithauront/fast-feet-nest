import { Either, left, right } from '@/core/either'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { AuthorizationService } from '../../../application/services/authorization'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'
import { Injectable } from '@nestjs/common'

interface GetPackageItemByIdUseCaseRequest {
  creatorId: string
  packageId: string
}
type AssingPackageItemUseCaseResponse = Either<
  PackageItemNotFoundError,
  PackageItemWithDetails
>

@Injectable()
export class GetPackageItemByIdUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    packageId,
  }: GetPackageItemByIdUseCaseRequest): Promise<AssingPackageItemUseCaseResponse> {
    const packageItem =
      await this.packageItemRepository.findPackageItemWithDetailsById(packageId)
    if (!packageItem) {
      return left(new PackageItemNotFoundError())
    }
    if (packageItem.courierId?.toString() === creatorId) {
      return right(packageItem)
    }
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }
    return right(packageItem)
  }
}
