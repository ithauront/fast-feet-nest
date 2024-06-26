import { Either, left, right } from '@/core/either'
import { Admin } from '@/domain/delivery/enterprise/entities/admin'
import { AdminRepository } from '../../repositories/admin-repository'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { InvalidActionError } from '../errors/invalid-action-error'
import { AuthorizationService } from '../../services/authorization'
import { Injectable } from '@nestjs/common'

interface MarkAdminAsActiveUseCaseRequest {
  creatorId: string
  adminId: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type MarkAdminAsActiveUseCaseResponse = Either<
  AuthorizationError | UserNotFoundError | InvalidActionError,
  Admin
>

@Injectable()
export class MarkAdminAsActiveUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    adminId,
  }: MarkAdminAsActiveUseCaseRequest): Promise<MarkAdminAsActiveUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const admin = await this.adminRepository.findById(adminId)

    if (!admin) {
      return left(new UserNotFoundError())
    }
    if (admin.id.toString() === '01') {
      return left(
        new InvalidActionError('The initial admin cannot be reactivated.'),
      )
    } // This will ensure that the initial admin can never be set to active again, as explained in the README and the register admin use case. The ID '01' is reserved for the initial admin, and for security reasons, it should be deactivated after fulfilling its purpose and never reactivated.

    admin.isActive = true

    await this.adminRepository.save(admin)
    return right(admin)
  }
}
