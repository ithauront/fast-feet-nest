import { Either, left, right } from '@/core/either'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { AuthorizationService } from '../../../application/services/authorization'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { QueryParams } from '@/core/repositories/query-params'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'
import { Injectable } from '@nestjs/common'

interface ListAllPackageItemsWithoutCourierToAdminUseCaseRequest {
  page: number
  creatorId: string
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type ListAllPackageItemsWithoutCourierToAdminUseCaseResponse = Either<
  AuthorizationError,
  PackageItemWithDetails[]
>

@Injectable()
export class ListAllPackageItemsWithoutCourierToAdminUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    page,
  }: ListAllPackageItemsWithoutCourierToAdminUseCaseRequest): Promise<ListAllPackageItemsWithoutCourierToAdminUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)
    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }
    const queryParams: QueryParams = {
      page,
    }
    const allPackageItemsWithoutCourier =
      await this.packageItemRepository.findManyByParamsAndCourierId(
        queryParams,
        null,
      )

    return right(allPackageItemsWithoutCourier)
  }
}
