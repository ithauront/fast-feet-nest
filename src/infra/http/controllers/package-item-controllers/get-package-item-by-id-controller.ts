import { GetPackageItemByIdUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/get-package-item-by-id'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common'

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
      throw new BadRequestException()
    }

    return { packageItem: result.value }
  }
}
