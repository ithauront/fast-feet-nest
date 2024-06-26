import { Either, left, right } from '@/core/either'
import { Admin } from '../../../enterprise/entities/admin'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { AdminRepository } from '../../repositories/admin-repository'
import { AuthorizationService } from '../../services/authorization'
import { Injectable } from '@nestjs/common'

interface MarkAdminAsInactiveUseCaseRequest {
  creatorId: string
  adminId: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type MarkAdminAsInactiveUseCaseResponse = Either<
  AuthorizationError | UserNotFoundError,
  Admin
>

@Injectable()
export class MarkAdminAsInactiveUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    adminId,
  }: MarkAdminAsInactiveUseCaseRequest): Promise<MarkAdminAsInactiveUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const admin = await this.adminRepository.findById(adminId)

    if (!admin) {
      return left(new UserNotFoundError())
    }
    admin.isActive = false

    await this.adminRepository.save(admin)
    return right(admin)
  }
}
