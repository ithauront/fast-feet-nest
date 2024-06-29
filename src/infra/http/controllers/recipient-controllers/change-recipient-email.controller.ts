import {
  Body,
  Controller,
  UnauthorizedException,
  BadRequestException,
  Put,
  Param,
  NotFoundException,
} from '@nestjs/common'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { UserNotFoundError } from '@/domain/delivery/application/use-cases/errors/user-not-found-error'
import { ChangeRecipientEmailUseCase } from '@/domain/delivery/application/use-cases/recipient-use-cases/change-recipient-email'

const changeRecipientEmailBodySchema = z.object({
  email: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(changeRecipientEmailBodySchema)

type ChangeRecipientEmailBodySchema = z.infer<
  typeof changeRecipientEmailBodySchema
>

@Controller('/user/recipient/:recipientEmail')
export class ChangeRecipientEmailController {
  constructor(private changeRecipientEmail: ChangeRecipientEmailUseCase) {}

  private async handleUseCaseResult(result) {
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
    return {
      message: `E-mail updated successfully to ${result.value.email}`,
    }
  }

  @Put()
  async handle(
    @Param('recipientEmail') recipientEmail: string,
    @CurentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: ChangeRecipientEmailBodySchema,
  ) {
    const { email } = body

    const result = await this.changeRecipientEmail.execute({
      creatorId: user.sub,
      recipientEmail,
      newEmail: email,
    })
    return this.handleUseCaseResult(result)
  }
}
