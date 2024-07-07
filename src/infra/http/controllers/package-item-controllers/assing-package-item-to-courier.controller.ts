import {
  Controller,
  UnauthorizedException,
  BadRequestException,
  Param,
  Put,
} from '@nestjs/common'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { AssingPackageItemToCourierUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/assing-package-item-to-courier-use-case'

@Controller('/package_item/assign/:packageItemId/:courierId')
export class AssingPackageItemToCourierController {
  constructor(private assingPackageItem: AssingPackageItemToCourierUseCase) {}

  @Put()
  async handle(
    @CurentUser() user: UserPayload,
    @Param('packageItemId') packageItemId: string,
    @Param('courierId') courierId: string,
  ) {
    const result = await this.assingPackageItem.execute({
      packageId: packageItemId,
      courierId,
      creatorId: user.sub,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UnauthorizedAdminError:
          throw new UnauthorizedException(error.message)
        case NotFoundOrUnauthorizedError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      message: `Package Item ${result.value.title}, is assigned to courier of id: ${result.value.courierId}`,
    }
  }
}
