import { Either, left, right } from '@/core/either'
import { Recipient } from '../../../enterprise/entities/recipient'
import { RecipientRepository } from '../../repositories/recipient-repository'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { AuthorizationService } from '../../services/authorization'
import { Injectable } from '@nestjs/common'

interface ListRecipientsUseCaseRequest {
  page: number
  creatorId: string
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type ListRecipientsUseCaseResponse = Either<
  AuthorizationError,
  {
    recipients: Recipient[]
  }
>

@Injectable()
export class ListRecipientsUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    page,
  }: ListRecipientsUseCaseRequest): Promise<ListRecipientsUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }
    const recipients = await this.recipientRepository.findMany({ page })

    return right({ recipients })
  }
}
