import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  UnauthorizedException,
  UsePipes,
} from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { InvalidCredentialsError } from '@/domain/delivery/application/use-cases/errors/invalid-credentials-error'
import { Public } from '@/infra/auth/public'
import { ChangePasswordUseCase } from '@/domain/delivery/application/use-cases/change-password'
import { TokenExpiredError } from '@nestjs/jwt'

const changePasswordBodySchema = z.object({
  password: z.string(),
})

type ChangePasswordBodySchema = z.infer<typeof changePasswordBodySchema>

@Controller('/auth/password_reset')
@Public()
export class ChangePasswordController {
  constructor(private changePassword: ChangePasswordUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(changePasswordBodySchema))
  async handle(
    @Body() body: ChangePasswordBodySchema,
    @Headers('Authorization') token: string,
  ) {
    const { password } = body
    const tokenFormated = token.replace('Bearer ', '')

    const result = await this.changePassword.execute({
      newPassword: password,
      uniqueAccessToken: tokenFormated,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case InvalidCredentialsError:
          throw new UnauthorizedException(error.message)
        case TokenExpiredError:
          throw new UnauthorizedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return result.value
  }
}
