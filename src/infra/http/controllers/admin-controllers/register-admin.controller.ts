import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { RegisterAdminUseCase } from '@/domain/delivery/application/use-cases/admin-use-cases/register-admin'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { UserAlreadyExistsError } from '@/domain/delivery/application/use-cases/errors/user-already-exists-error'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  password: z.string(),
  isActive: z.boolean().optional(),
})

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/users/admin')
@UseGuards(JwtAuthGuard)
export class RegisterAdminController {
  constructor(private registerAdmin: RegisterAdminUseCase) {}
  @Post()
  async handle(
    @CurentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateAccountBodySchema,
  ) {
    const { name, email, cpf, password, isActive } = body

    const result = await this.registerAdmin.execute({
      creatorId: user.sub,
      name,
      cpf,
      email,
      password,
      isActive,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UnauthorizedAdminError:
          throw new UnauthorizedException(error.message)
        case NotFoundOrUnauthorizedError:
          throw new UnauthorizedException(error.message)
        case UserAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    return { admin: result.value }
  }
}
