import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { PackageItemPresenter } from '../../presenters/package-item-presenter'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { ListReturnedPackageItemToAdminUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/list-returned-package-items-to-admin'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/package_item/list/returned')
export class ListReturnedPackageItemsToAdminController {
  constructor(
    private listReturnedPackageItemsToAdmin: ListReturnedPackageItemToAdminUseCase,
  ) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageParamsTypeSchema,
    @CurentUser() user: UserPayload,
  ) {
    const result = await this.listReturnedPackageItemsToAdmin.execute({
      creatorId: user.sub,
      page,
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
      packageItems: result.value.map(PackageItemPresenter.toHTTP),
    }
  }
}
