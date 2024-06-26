import { Either, left, right } from '@/core/either'
import { Recipient } from '../../../enterprise/entities/recipient'
import { RecipientRepository } from '../../repositories/recipient-repository'
import { AuthorizationService } from '../../services/authorization'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { Injectable } from '@nestjs/common'

interface GetRecipientEmailUseCaseRequest {
  creatorId: string
  recipientEmail: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type GetRecipientEmailUseCaseResponse = Either<
  AuthorizationError | UserNotFoundError,
  Recipient
>

@Injectable()
export class GetRecipientEmailUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    recipientEmail,
  }: GetRecipientEmailUseCaseRequest): Promise<GetRecipientEmailUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const recipient = await this.recipientRepository.findByEmail(recipientEmail)

    if (!recipient) {
      return left(new UserNotFoundError())
    }

    return right(recipient)
  }
}
