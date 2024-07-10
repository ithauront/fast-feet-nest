import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/domain/delivery/application/use-cases/errors/invalid-credentials-error'
import { Public } from '@/infra/auth/public'
import { RequestPasswordChangeUseCase } from '@/domain/delivery/application/use-cases/request-password-change'

const requestPasswordChangeBodySchema = z.object({
  userEmail: z.string(),
})

type RequestPasswordChangeBodySchema = z.infer<
  typeof requestPasswordChangeBodySchema
>

@Controller('/auth/request_password_reset')
@Public()
export class RequestPasswordChangeController {
  constructor(private requestPasswordChange: RequestPasswordChangeUseCase) {}

  @Post()
  @HttpCode(200)
  @UsePipes(new ZodValidationPipe(requestPasswordChangeBodySchema))
  async handle(@Body() body: RequestPasswordChangeBodySchema) {
    const { userEmail } = body

    const result = await this.requestPasswordChange.execute({
      userEmail,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidCredentialsError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value
  }
}
