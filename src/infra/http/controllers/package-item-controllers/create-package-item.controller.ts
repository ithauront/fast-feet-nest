import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreatePackageItemUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/create-package-item'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'

const createPackageItemBodySchema = z.object({
  title: z.string(),
  deliveryAddress: z.string(),
  courierId: z.string().optional(),
  recipientId: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createPackageItemBodySchema)

type CreatePackageItemBodySchema = z.infer<typeof createPackageItemBodySchema>

@Controller('/package_item')
export class CreatePackageItemController {
  constructor(private createPackageItem: CreatePackageItemUseCase) {}

  @Post()
  async handle(
    @CurentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreatePackageItemBodySchema,
  ) {
    const { title, deliveryAddress, courierId, recipientId } = body
    const result = await this.createPackageItem.execute({
      title,
      deliveryAddress,
      courierId,
      recipientId,
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

    return { packageItem: result.value }
  }
}
