import { Either, left, right } from '@/core/either'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { AuthorizationService } from '../../../application/services/authorization'
import { PackageStatus } from '../../../enterprise/entities/package-item'
import { PackageItemRepository } from '../../repositories/package-item-repository'
import { QueryParams } from '@/core/repositories/query-params'
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details'
import { Injectable } from '@nestjs/common'

interface ListCourierPackageItemsOfSameAddressUseCaseRequest {
  page: number
  creatorId: string
  courierId: string
  address: string
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type ListCourierPackageItemsOfSameAddressUseCaseResponse = Either<
  AuthorizationError,
  PackageItemWithDetails[]
>

@Injectable()
export class ListCourierPackageItemsOfSameAddressUseCase {
  constructor(
    private packageItemRepository: PackageItemRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    courierId,
    page,
    address,
  }: ListCourierPackageItemsOfSameAddressUseCaseRequest): Promise<ListCourierPackageItemsOfSameAddressUseCaseResponse> {
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
      address,
    } // we only list in transit because that is when the courier might need to see if he have more than one package to the same address

    const courierPackageItems =
      await this.packageItemRepository.findManyByParamsAndCourierId(
        queryParams,
        courierId,
      )

    return right(courierPackageItems)
  }
}
