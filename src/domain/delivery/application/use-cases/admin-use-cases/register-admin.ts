// In the business rules, it's stated that only admins can perform CRUD operations, which poses a challenge for creating the first admin. To address this, an initial admin is created via a script with a hardcoded ID and a generic password. This initial admin uses the standard system flow to create the first real admin. After this first real admin is created, they are instructed to set the initial admin as inactive using the system. In the useCase for reactivating admins, we have a specific rule preventing the initial admin from being reactivated for security reasons. This approach allows us to maintain most of our CRUD useCases (and tests, where we can create admins with factories) without needing to account for the first admin scenario, except in the useCases related to setting an admin to active and in the instructions provided to the first real admin.

import { Either, left, right } from '@/core/either'
import { HashGenerator } from '../../cryptography/hash-generator'
import { Admin } from '../../../enterprise/entities/admin'
import { AdminRepository } from '../../repositories/admin-repository'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { AuthorizationService } from '../../services/authorization'

interface RegisterAdminUseCaseRequest {
  creatorId: string
  name: string
  email: string
  cpf: string
  password: string
  isActive?: boolean
}

type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError
type RegisterAdminUseCaseResponse = Either<
  AuthorizationError | UserAlreadyExistsError,
  Admin
>

export class RegisterAdminUseCase {
  constructor(
    private adminRepository: AdminRepository,
    private hashGenerator: HashGenerator,
    private authorizationService: AuthorizationService,
  ) {}

  async execute({
    creatorId,
    name,
    email,
    password,
    cpf,
    isActive,
  }: RegisterAdminUseCaseRequest): Promise<RegisterAdminUseCaseResponse> {
    const authorizationResult =
      await this.authorizationService.authorize(creatorId)

    if (authorizationResult?.isLeft()) {
      return left(authorizationResult.value)
    }

    const adminWithSameEmail = await this.adminRepository.findByEmail(email)

    if (adminWithSameEmail) {
      return left(new UserAlreadyExistsError())
    }
    const hashedPassword = await this.hashGenerator.hash(password)

    const admin = Admin.create({
      name,
      email,
      cpf,
      password: hashedPassword,
      isActive,
    })
    await this.adminRepository.create(admin)
    return right(admin)
  }
}
