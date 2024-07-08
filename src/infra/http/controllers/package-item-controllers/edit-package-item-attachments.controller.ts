import {
  Controller,
  BadRequestException,
  Param,
  Put,
  NotFoundException,
  Body,
} from '@nestjs/common'
import { EditPackageItemAttachmentUseCase } from '@/domain/delivery/application/use-cases/package-items-use-cases/edit-package-item-attachments'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { PackageItemNotFoundError } from '@/domain/delivery/application/use-cases/errors/package-item-not-found-error'
import { Public } from '@/infra/auth/public'

const editPackageItemAttachmentsBodySchema = z.object({
  attachmentIds: z.array(z.string()),
})

const bodyValidationPipe = new ZodValidationPipe(
  editPackageItemAttachmentsBodySchema,
)

type EditPackageItemAttachmentBodySchema = z.infer<
  typeof editPackageItemAttachmentsBodySchema
>

@Controller('/package_item/edit/:packageItemId')
@Public()
export class EditPackageItemAttachmentController {
  constructor(private editPackageItem: EditPackageItemAttachmentUseCase) {}

  @Put()
  async handle(
    @Param('packageItemId') packageItemId: string,
    @Body(bodyValidationPipe) body: EditPackageItemAttachmentBodySchema,
  ) {
    const { attachmentIds } = body

    const result = await this.editPackageItem.execute({
      packageItemId,
      attachmentIds,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case PackageItemNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return {
      message: `Package Item ${result.value.title}, attachments has been edited`,
    }
  }
}
