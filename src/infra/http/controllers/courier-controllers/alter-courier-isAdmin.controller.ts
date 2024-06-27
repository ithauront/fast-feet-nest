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
import { GrantAdminStatusToCourierUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/grant-admin-status-to-courier'
import { RevokeAdminStatusToCourierUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/revoke-admin-status-to-courier'

const alterCourierIsAdminBodySchema = z.object({
  isAdmin: z.boolean(),
})

const bodyValidationPipe = new ZodValidationPipe(alterCourierIsAdminBodySchema)

type AlterCourierIsAdminBodySchema = z.infer<
  typeof alterCourierIsAdminBodySchema
>

@Controller('/user/courier/:courierId/isAdmin')
export class AlterCourierIsAdminController {
  constructor(
    private grantIsAdmin: GrantAdminStatusToCourierUseCase,
    private revokeIsAdmin: RevokeAdminStatusToCourierUseCase,
  ) {}

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
    return { message: 'IsAdmin updated successfully' }
  }

  @Put()
  async handle(
    @Param('courierId') courierId: string,
    @CurentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: AlterCourierIsAdminBodySchema,
  ) {
    const { isAdmin } = body

    let result

    if (isAdmin) {
      result = await this.grantIsAdmin.execute({
        creatorId: user.sub,
        courierId,
      })
      return this.handleUseCaseResult(result)
    } else {
      result = await this.revokeIsAdmin.execute({
        creatorId: user.sub,
        courierId,
      })
      return this.handleUseCaseResult(result)
    }
  }
}
