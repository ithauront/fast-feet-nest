import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ListAllPackageItemsToAdminUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/list-all-package-items-to-admin'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { PackageItemPresenter } from '../../presenters/package-item-presenter'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/package_item')
@UseGuards(JwtAuthGuard)
export class ListAllPackageItemsToAdminController {
  constructor(
    private listAllPackageItemsToAdmin: ListAllPackageItemsToAdminUseCase,
  ) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageParamsTypeSchema,
    @CurentUser() user: UserPayload,
  ) {
    const result = await this.listAllPackageItemsToAdmin.execute({
      creatorId: user.sub,
      page,
    })

    if (result.isLeft()) {
      const errorCode =
        result.value instanceof UnauthorizedAdminError
          ? HttpStatus.FORBIDDEN
          : HttpStatus.NOT_FOUND
      const errorMessage = result.value.message || 'Unauthorized or not found'
      throw new HttpException(errorMessage, errorCode)
    }
    return {
      packageItems: result.value.map(PackageItemPresenter.toHTTP),
    }
  }
}
