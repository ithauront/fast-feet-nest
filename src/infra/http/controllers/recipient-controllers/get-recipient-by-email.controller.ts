import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { GetRecipientEmailUseCase } from '@/domain/delivery/application/use-cases/recipient-use-cases/get-recipient-by-email'
import { UserNotFoundError } from '@/domain/delivery/application/use-cases/errors/user-not-found-error'
import { RecipientPresenter } from '../../presenters/recipient-presenter'

@Controller('/user/recipient/:recipientEmail')
export class GetRecipientByEmailController {
  constructor(private getRecipientByEmailId: GetRecipientEmailUseCase) {}

  @Get()
  async handle(
    @Param('recipientEmail') recipientEmail: string,
    @CurentUser() user: UserPayload,
  ) {
    const result = await this.getRecipientByEmailId.execute({
      creatorId: user.sub,
      recipientEmail,
    })
    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UnauthorizedAdminError:
          throw new UnauthorizedException(error.message)
        case NotFoundOrUnauthorizedError:
          throw new UnauthorizedException(error.message)
        case UserNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { Recipient: RecipientPresenter.toHTTP(result.value) }
  }
}
