import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { PackageItemPresenter } from '../../presenters/package-item-presenter'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { ListCourierPackageItemsOfSameAddressUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/list-courier-package-items-of-same-address'

const listourierSameAddressBodySchema = z.object({
  address: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(
  listourierSameAddressBodySchema,
)

type ListourierSameAddressBodySchema = z.infer<
  typeof listourierSameAddressBodySchema
>
const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

@Controller('/package_item/:courierId/list/same_address')
export class ListCourierSameAddressPackageItemController {
  constructor(
    private listCourierPackageItemofSameAddress: ListCourierPackageItemsOfSameAddressUseCase,
  ) {}

  // even if its atypical to use post to list data I will use this here to send a body with the address. with this we do not risk having a url that exceds the lenght if characters if the address is to big and we do not rick exposure of the address.
  @Post()
  @HttpCode(200)
  async handle(
    @Query('page', queryValidationPipe) page: PageParamsTypeSchema,
    @CurentUser() user: UserPayload,
    @Param('courierId') courierId: string,
    @Body(bodyValidationPipe) body: ListourierSameAddressBodySchema,
  ) {
    const { address } = body
    const result = await this.listCourierPackageItemofSameAddress.execute({
      creatorId: user.sub,
      page,
      courierId,
      address,
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
