import {
  Body,
  Controller,
  UnauthorizedException,
  BadRequestException,
  Put,
  Param,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { MarkAdminAsActiveUseCase } from '@/domain/delivery/application/use-cases/admin-use-cases/mark-admin-as-active'
import { MarkAdminAsInactiveUseCase } from '@/domain/delivery/application/use-cases/admin-use-cases/mark-admin-as-inactive'
import { UserNotFoundError } from '@/domain/delivery/application/use-cases/errors/user-not-found-error'
import { InvalidActionError } from '@/domain/delivery/application/use-cases/errors/invalid-action-error'

const alterAdminStatusBodySchema = z.object({
  status: z.boolean(),
})

const bodyValidationPipe = new ZodValidationPipe(alterAdminStatusBodySchema)

type AlterAdminStatusBodySchema = z.infer<typeof alterAdminStatusBodySchema>

@Controller('/user/admin/:adminId/status')
export class AlterAdminStatusController {
  constructor(
    private markAsActive: MarkAdminAsActiveUseCase,
    private markAsInactive: MarkAdminAsInactiveUseCase,
  ) {}

  private handleErrorReturn(error) {
    switch (error.constructor) {
      case UnauthorizedAdminError:
        throw new UnauthorizedException(error.message)
      case NotFoundOrUnauthorizedError:
        throw new UnauthorizedException(error.message)
      case UserNotFoundError:
        throw new NotFoundException(error.message)
      case InvalidActionError:
        throw new ForbiddenException(error.message)
      default:
        throw new BadRequestException(error.message)
    }
  }

  @Put()
  async handle(
    @Param('adminId') adminId: string,
    @CurentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: AlterAdminStatusBodySchema,
  ) {
    const { status } = body

    if (status === true) {
      const result = await this.markAsActive.execute({
        creatorId: user.sub,
        adminId,
      })

      if (result.isLeft()) {
        const error = result.value
        this.handleErrorReturn(error)
      }
      return { message: 'Admin status is now active' }
    } else {
      const result = await this.markAsInactive.execute({
        creatorId: user.sub,
        adminId,
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
      return { message: 'Admin status is now inactive' }
    }
  }
}
