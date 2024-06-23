import {
  Body,
  Controller,
  UnauthorizedException,
  BadRequestException,
  Put,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { z } from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { MarkPackageItemAsInTransitUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-in-transit'
import { MarkPackageItemAsLostUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-lost'
import { MarkPackageItemAsDeliveredUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-delivered'
import { MarkPackageItemAsReturnedUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/mark-package-item-as-returned'
import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import { PackageItemNotFoundError } from '@/domain/delivery/application/use-cases/errors/package-item-not-found-error'

const alterPackageItemStatusBodySchema = z.object({
  status: z.nativeEnum(PackageStatus),
  attachmentIds: z.array(z.string()).optional(),
})

const bodyValidationPipe = new ZodValidationPipe(
  alterPackageItemStatusBodySchema,
)

type AlterPackageItemStatusBodySchema = z.infer<
  typeof alterPackageItemStatusBodySchema
>

@Controller('/package_item/:packageId/status')
export class AlterPackageItemStatusController {
  constructor(
    private markAsInTransit: MarkPackageItemAsInTransitUseCase,
    private markAsLost: MarkPackageItemAsLostUseCase,
    private markAsDelivered: MarkPackageItemAsDeliveredUseCase,
    private markAsReturned: MarkPackageItemAsReturnedUseCase,
  ) {}

  private async handleUseCaseResult(result) {
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
    return { message: 'Status updated successfully' }
  }

  @Put()
  async handle(
    @Param('packageId') packageId: string,
    @CurentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: AlterPackageItemStatusBodySchema,
  ) {
    const { status, attachmentIds } = body

    let result

    try {
      switch (status) {
        case PackageStatus.IN_TRANSIT:
          result = await this.markAsInTransit.execute({
            creatorId: user.sub,
            packageItemId: packageId,
          })
          return this.handleUseCaseResult(result)

        case PackageStatus.LOST:
          result = await this.markAsLost.execute({
            creatorId: user.sub,
            packageItemId: packageId,
          })
          return this.handleUseCaseResult(result)

        case PackageStatus.RETURNED:
          result = await this.markAsReturned.execute({
            creatorId: user.sub,
            packageItemId: packageId,
          })
          return this.handleUseCaseResult(result)

        // caso de delivered ainda da erro 500 talvez tenha algo a ver com a referencia circuar no id do packageItem ou no id do attachments. testar apos criar attachments
        case PackageStatus.DELIVERED:
          if (!attachmentIds) {
            throw new BadRequestException(
              'Attachment IDs are required for delivered status',
            )
          }
          result = await this.markAsDelivered.execute({
            creatorId: user.sub,
            packageItemId: packageId,
            attachmentIds,
          })
          return this.handleUseCaseResult(result)

        default:
          throw new BadRequestException('Invalid status')
      }
    } catch (error) {
      throw new InternalServerErrorException('Unexpected error occurred')
    }
  }
}
