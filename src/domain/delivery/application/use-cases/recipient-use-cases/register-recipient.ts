import { Either, left, right } from '@/core/either'
import { Recipient } from '../../../enterprise/entities/recipient'
import { RecipientRepository } from '../../repositories/recipient-repository'
import { AuthorizationService } from '../../services/authorization'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface RegisterRecipientUseCaseRequest {
  creatorId: string
  name: string
  email: string
  address: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type RegisterRecipientUseCaseResponse = Either<
  AuthorizationError | UserAlreadyExistsError,
  Recipient
>

export class RegisterRecipientUseCase {
  constructor(
    private recipientRepository: RecipientRepository,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    name,
    email,
    address,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const recipientWithSameEmail =
      await this.recipientRepository.findByEmail(email)

    if (recipientWithSameEmail) {
      if (recipientWithSameEmail.address === address) {
        return right(recipientWithSameEmail)
      }

      return left(
        new UserAlreadyExistsError(
          'Recipient with the provided email exists but with a different address. Please verify the email and address provided.',
        ),
      )
    } // I took a pragmatic approach when encountering a Recipient with the same email. If the address matches as well, we return the existing Recipient instead of creating a new one or throwing an error. This simplifies the workflow for the user (admin), avoiding unnecessary additional steps, given that Recipients are usually created in preparation for assigning PackageItems and we know what the user wants is to have acess to the id and address of the recipient(and if not existing save the recipient). This compromise of the single responsability from only creating to also getting is made for practicality.

    const recipient = Recipient.create({
      name,
      email,
      address,
    })
    await this.recipientRepository.create(recipient)
    return right(recipient)
  }
}
