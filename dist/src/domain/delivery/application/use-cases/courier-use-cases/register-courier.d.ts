import { Either } from '@/core/either';
import { HashGenerator } from '../../cryptography/hash-generator';
import { Courier, CourierStatus } from '../../../enterprise/entities/courier';
import { CourierRepository } from '../../repositories/courier-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { AuthorizationService } from '../../services/authorization';
interface RegisterCourierUseCaseRequest {
    creatorId: string;
    name: string;
    email: string;
    password: string;
    cpf: string;
    isAdmin?: boolean;
    status?: CourierStatus;
    location?: {
        latitude: number;
        longitude: number;
    };
    phone: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type RegisterCourierUseCaseResponse = Either<AuthorizationError | UserAlreadyExistsError, Courier>;
export declare class RegisterCourierUseCase {
    private courierRepository;
    private hashGenerator;
    private authorizationService;
    constructor(courierRepository: CourierRepository, hashGenerator: HashGenerator, authorizationService: AuthorizationService);
    execute({ creatorId, name, email, password, cpf, phone, isAdmin, location, status, }: RegisterCourierUseCaseRequest): Promise<RegisterCourierUseCaseResponse>;
}
export {};
