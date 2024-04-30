import { Either, left, right } from '@/core/either'
import { Admin } from '../../../enterprise/entities/admin'
import { AdminRepository } from '../../repositories/admin-repository'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { AuthorizationService } from '../../services/authorization'

interface ListAdminUseCaseRequest {
  page: number
  creatorId: string
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type ListAdminUseCaseResponse = Either<
  AuthorizationError,
  {
    admin: Admin[]
  }
>

export class ListAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    page,
  }: ListAdminUseCaseRequest): Promise<ListAdminUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }
    const admin = await this.adminRepository.findMany({ page })

    return right({ admin })
  }
}
