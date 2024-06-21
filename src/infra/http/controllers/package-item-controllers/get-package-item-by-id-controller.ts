import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { GetPackageItemByIdUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/get-package-item-by-id'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { PackageItemPresenter } from '../../presenters/package-item-presenter'
import { PackageItemNotFoundError } from '@/domain/delivery/application/use-cases/errors/package-item-not-found-error'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'

@Controller('/package_item/:packageId')
@UseGuards(JwtAuthGuard)
export class GetPackageItemByIdController {
  constructor(private getPackageItemById: GetPackageItemByIdUseCase) {}

  @Get()
  async handle(
    @Param('packageId') packageId: string,
    @CurentUser() user: UserPayload,
  ) {
    const result = await this.getPackageItemById.execute({
      packageId,
      creatorId: user.sub,
    })
    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UnauthorizedAdminError:
          throw new UnauthorizedException(error.message)
        case NotFoundOrUnauthorizedError:
          throw new UnauthorizedException(error.message)
        case PackageItemNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { packageItem: PackageItemPresenter.toHTTP(result.value) }
  }
}
