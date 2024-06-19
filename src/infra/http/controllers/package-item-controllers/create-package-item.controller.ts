import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { CreatePackageItemUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/create-package-item'

const createPackageItemBodySchema = z.object({
  title: z.string(),
  deliveryAddress: z.string(),
  courierId: z.string().optional(),
  recipientId: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(createPackageItemBodySchema)

type CreatePackageItemBodySchema = z.infer<typeof createPackageItemBodySchema>

@Controller('/package_item')
@UseGuards(JwtAuthGuard)
export class CreatePackageItemController {
  constructor(private createPackageItem: CreatePackageItemUseCase) {}

  @Post()
  async handle(
    @CurentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreatePackageItemBodySchema,
  ) {
    const { title, deliveryAddress, courierId, recipientId } = body

    await this.createPackageItem.execute({
      title,
      deliveryAddress,
      courierId,
      recipientId,
      creatorId: user.sub,
    })
  }
}
