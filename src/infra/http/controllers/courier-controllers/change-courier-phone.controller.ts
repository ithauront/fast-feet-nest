import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { CourierPresenter } from '../../presenters/courier-presenter'
import { ChangeCourierPhoneUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/change-courier-phone'
import { UserNotFoundError } from '@/domain/delivery/application/use-cases/errors/user-not-found-error'

const changeCourierPhoneBodySchema = z.object({
  phone: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(changeCourierPhoneBodySchema)

type ChangeCourierPhoneBodySchema = z.infer<typeof changeCourierPhoneBodySchema>

@Controller('/user/courier/:courierId/phone')
export class ChangeCourierPhoneController {
  constructor(private changeCourierPhone: ChangeCourierPhoneUseCase) {}

  @Put()
  async handle(
    @Param('courierId') courierId: string,
    @CurentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: ChangeCourierPhoneBodySchema,
  ) {
    const { phone } = body
    const result = await this.changeCourierPhone.execute({
      creatorId: user.sub,
      courierId,
      phone,
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

    return {
      courier: CourierPresenter.toHTTP(result.value),
    }
  }
}
