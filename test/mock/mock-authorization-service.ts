import { Either, left, right } from '@/core/either'
import { AuthorizationService } from '@/domain/delivery/application/services/authorization'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'

export class MockAuthorizationService extends AuthorizationService {
  activeAdminIds: Set<string> = new Set()
  inactiveAdminIds: Set<string> = new Set()
  failAuthorizationForIds: Set<string> = new Set()

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    super(undefined as any, undefined as any)
  }

  async authorize(
    creatorId: string,
  ): Promise<
    Either<UnauthorizedAdminError | NotFoundOrUnauthorizedError, void>
  > {
    if (this.inactiveAdminIds.has(creatorId)) {
      return left(new UnauthorizedAdminError())
    }

    if (this.failAuthorizationForIds.has(creatorId)) {
      return left(new UnauthorizedAdminError())
    }

    if (this.activeAdminIds.has(creatorId)) {
      return right(undefined)
    }

    return left(new NotFoundOrUnauthorizedError())
  }

  addActiveAdminId(creatorId: string) {
    this.activeAdminIds.add(creatorId)
  }

  addInactiveAdminId(creatorId: string) {
    this.inactiveAdminIds.add(creatorId)
  }

  addFailAuthorizationForId(creatorId: string) {
    this.failAuthorizationForIds.add(creatorId)
  }

  clear() {
    this.activeAdminIds.clear()
    this.inactiveAdminIds.clear()
    this.failAuthorizationForIds.clear()
  }
}
