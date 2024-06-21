import { Either, left, right } from '@/core/either'
import { HashGenerator } from '../../cryptography/hash-generator'
import { Courier, CourierStatus } from '../../../enterprise/entities/courier'
import { GeoLocation } from '../../../enterprise/entities/value-object/geolocation'
import { CourierRepository } from '../../repositories/courier-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { AuthorizationService } from '../../services/authorization'
import { Injectable } from '@nestjs/common'

interface RegisterCourierUseCaseRequest {
  creatorId: string
  name: string
  email: string
  password: string
  cpf: string
  isAdmin?: boolean
  status?: CourierStatus
  location?: { latitude: number; longitude: number }
  phone: string
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type RegisterCourierUseCaseResponse = Either<
  AuthorizationError | UserAlreadyExistsError,
  Courier
>

@Injectable()
export class RegisterCourierUseCase {
  constructor(
    private courierRepository: CourierRepository,
    private hashGenerator: HashGenerator,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    name,
    email,
    password,
    cpf,
    phone,
    isAdmin,
    location,
    status,
  }: RegisterCourierUseCaseRequest): Promise<RegisterCourierUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const courierWithSameEmail = await this.courierRepository.findByEmail(email)

    if (courierWithSameEmail) {
      return left(new UserAlreadyExistsError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const courier = Courier.create({
      name,
      email,
      cpf,
      password: hashedPassword,
      phone,
      isAdmin,
      location: location
        ? new GeoLocation(location.latitude, location.longitude)
        : null,
      status,
    })
    await this.courierRepository.create(courier)
    return right(courier)
  }
}
