import {
  Body,
  Controller,
  UnauthorizedException,
  BadRequestException,
  Put,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { CourierStatus } from '@/domain/delivery/enterprise/entities/courier'
import { MarkCourierAsActiveUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/mark-courier-as-active'
import { MarkCourierAsDismissedUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/mark-courier-as-dismissed'
import { MarkCourierAsInactiveUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/mark-courier-as-inactive'
import { MarkCourierAsOnVacationUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/mark-courier-as-on-vacation'
import { UserNotFoundError } from '@/domain/delivery/application/use-cases/errors/user-not-found-error'

const alterCourierStatusBodySchema = z.object({
  status: z.nativeEnum(CourierStatus),
})

const bodyValidationPipe = new ZodValidationPipe(alterCourierStatusBodySchema)

type AlterCourierStatusBodySchema = z.infer<typeof alterCourierStatusBodySchema>

@Controller('/user/courier/:courierId/status')
export class AlterCourierStatusController {
  constructor(
    private markAsActive: MarkCourierAsActiveUseCase,
    private markAsDismissed: MarkCourierAsDismissedUseCase,
    private markAsInactive: MarkCourierAsInactiveUseCase,
    private markAsOnVacation: MarkCourierAsOnVacationUseCase,
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
    return { message: 'Status updated successfully' }
  }

  @Put()
  async handle(
    @Param('courierId') courierId: string,
    @CurentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: AlterCourierStatusBodySchema,
  ) {
    const { status } = body

    let result

    try {
      switch (status) {
        case CourierStatus.ACTIVE:
          result = await this.markAsActive.execute({
            creatorId: user.sub,
            courierId,
          })
          return this.handleUseCaseResult(result)

        case CourierStatus.DISMISSED:
          result = await this.markAsDismissed.execute({
            creatorId: user.sub,
            courierId,
          })
          return this.handleUseCaseResult(result)

        case CourierStatus.INACTIVE:
          result = await this.markAsInactive.execute({
            creatorId: user.sub,
            courierId,
          })
          return this.handleUseCaseResult(result)

        case CourierStatus.ON_VACATION:
          result = await this.markAsOnVacation.execute({
            creatorId: user.sub,
            courierId,
          })
          return this.handleUseCaseResult(result)

        default:
          throw new BadRequestException('Invalid status')
      }
    } catch (error) {
      throw new InternalServerErrorException('Unexpected error occurred')
    }
  }
}
