import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { GetPackageItemByIdUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/get-package-item-by-id'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common'
import { PackageItemPresenter } from '../../presenters/package-item-presenter'

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
      const errorCode =
        result.value instanceof UnauthorizedAdminError
          ? HttpStatus.FORBIDDEN
          : HttpStatus.NOT_FOUND
      const errorMessage = result.value.message || 'Unauthorized or not found'
      throw new HttpException(errorMessage, errorCode)
    }

    return { packageItem: PackageItemPresenter.toHTTP(result.value) }
  }
}
