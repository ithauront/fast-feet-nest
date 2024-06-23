// Since a lost package item is not a desirable and usual end to a process I chose to only allow admins to mark the package as lost, not even the courier assigned can mark it as lost. This way it should ensure that this process would be taken seriously.

import { Either, left, right } from '@/core/either'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item'
import { AuthorizationService } from '../../services/authorization'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Injectable } from '@nestjs/common'

interface MarkPackageItemAsLostUseCaseRequest {
  creatorId: string
  packageItemId: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type MarkPackageItemAsLostUseCaseResponse = Either<
  AuthorizationError | PackageItemNotFoundError,
  PackageItem
>

@Injectable()
export class MarkPackageItemAsLostUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    packageItemId,
  }: MarkPackageItemAsLostUseCaseRequest): Promise<MarkPackageItemAsLostUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)
    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }
    const packageItem = await this.packageItemRepository.findById(packageItemId)
    if (!packageItem) {
      return left(new PackageItemNotFoundError())
    }

    packageItem.markAsLost(new UniqueEntityId(creatorId))

    await this.packageItemRepository.save(packageItem)
    return right(packageItem)
  }
}
