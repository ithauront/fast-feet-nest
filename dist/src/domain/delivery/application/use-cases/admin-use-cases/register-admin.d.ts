import { Either } from '@/core/either';
import { HashGenerator } from '../../cryptography/hash-generator';
import { Admin } from '../../../enterprise/entities/admin';
import { AdminRepository } from '../../repositories/admin-repository';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { AuthorizationService } from '../../services/authorization';
interface RegisterAdminUseCaseRequest {
    creatorId: string;
    name: string;
    email: string;
    cpf: string;
    password: string;
    isActive?: boolean;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type RegisterAdminUseCaseResponse = Either<AuthorizationError | UserAlreadyExistsError, Admin>;
export declare class RegisterAdminUseCase {
    private adminRepository;
    private hashGenerator;
    private authorizationService;
    constructor(adminRepository: AdminRepository, hashGenerator: HashGenerator, authorizationService: AuthorizationService);
    execute({ creatorId, name, email, password, cpf, isActive, }: RegisterAdminUseCaseRequest): Promise<RegisterAdminUseCaseResponse>;
}
export {};
