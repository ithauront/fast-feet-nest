import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { AutenticateUseCase } from '@/domain/delivery/application/use-cases/autenticate'
import { InvalidCredentialsError } from '@/domain/delivery/application/use-cases/errors/invalid-credentials-error'

const autenticateBodySchema = z.object({
  cpf: z.string(),
  password: z.string(),
})

type AutenticateBodySchema = z.infer<typeof autenticateBodySchema>

@Controller('/sessions')
export class AutenticateController {
  constructor(
    private jwt: JwtService,
    private autenticate: AutenticateUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(autenticateBodySchema))
  async handle(@Body() body: AutenticateBodySchema) {
    const { cpf, password } = body

    const result = await this.autenticate.execute({
      cpf,
      password,
    })

    if (result.isLeft()) {
      const errorCode =
        result.value instanceof InvalidCredentialsError
          ? HttpStatus.UNAUTHORIZED
          : HttpStatus.FORBIDDEN
      const errorMessage =
        result.value.message || 'An unexpected error occurred'
      throw new HttpException(errorMessage, errorCode)
    }

    const { accessToken } = result.value

    return { access_token: accessToken }
  }
}
