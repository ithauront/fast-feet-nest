// Since only Admin can perform this action I'm confortable with the possibility to change the email only having the recipient previously email as information

import { Either, left, right } from '@/core/either'
import { Recipient } from '../../../enterprise/entities/recipient'
import { RecipientRepository } from '../../repositories/recipient-repository'
import { AuthorizationService } from '../../services/authorization'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { Injectable } from '@nestjs/common'

interface ChangeRecipientEmailUseCaseRequest {
  creatorId: string
  recipientEmail: string
  newEmail: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type ChangeRecipientEmailUseCaseResponse = Either<
  AuthorizationError | UserNotFoundError,
  Recipient
>

@Injectable()
export class ChangeRecipientEmailUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    recipientEmail,
    newEmail,
  }: ChangeRecipientEmailUseCaseRequest): Promise<ChangeRecipientEmailUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const recipient = await this.recipientRepository.findByEmail(recipientEmail)

    if (!recipient) {
      return left(new UserNotFoundError())
    }
    recipient.email = newEmail

    await this.recipientRepository.save(recipient)
    return right(recipient)
  }
}
