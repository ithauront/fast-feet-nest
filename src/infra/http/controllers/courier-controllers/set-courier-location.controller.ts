import {
  BadRequestException,
  Controller,
  NotFoundException,
  Put,
  Req,
} from '@nestjs/common'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CourierPresenter } from '../../presenters/courier-presenter'
import { UserNotFoundError } from '@/domain/delivery/application/use-cases/errors/user-not-found-error'
import { SetCourierLocationUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/set-courier-location'

@Controller('/user/courier/location')
export class SetCourierLocationController {
  constructor(private setCourierLocation: SetCourierLocationUseCase) {}

  @Put()
  async handle(@CurentUser() user: UserPayload, @Req() req: Request) {
    const ip = ((req.headers['x-forwarded-for'] as string) || '')
      .split(',')[0]
      .trim()

    const result = await this.setCourierLocation.execute({
      creatorId: user.sub,
      ip,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
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
