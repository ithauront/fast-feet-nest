import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { RegisterCourierUseCase } from '@/domain/delivery/application/use-cases/courier-use-cases/register-courier'
import { CurentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CourierStatus } from '@/domain/delivery/enterprise/entities/courier'
import { UnauthorizedAdminError } from '@/domain/delivery/application/use-cases/errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '@/domain/delivery/application/use-cases/errors/not-found-or-unauthorized-error'
import { UserAlreadyExistsError } from '@/domain/delivery/application/use-cases/errors/user-already-exists-error'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  password: z.string(),
  phone: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isAdmin: z.boolean().optional(),
  status: z.nativeEnum(CourierStatus).optional(),
})

const bodyValidationPipe = new ZodValidationPipe(createAccountBodySchema)

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/users/courier')
export class RegisterCourierController {
  constructor(private registerCourier: RegisterCourierUseCase) {}

  @Post()
  async handle(
    @CurentUser() user: UserPayload,
    @Body(bodyValidationPipe) body: CreateAccountBodySchema,
  ) {
    const {
      name,
      email,
      cpf,
      password,
      phone,
      latitude,
      longitude,
      isAdmin,
      status,
    } = body
    const location =
      latitude !== undefined && longitude !== undefined
        ? { latitude, longitude }
        : undefined

    const result = await this.registerCourier.execute({
      creatorId: user.sub,
      name,
      cpf,
      email,
      password,
      phone,
      isAdmin,
      status,
      location,
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

    return { courier: result.value }
  }
}
