import { Either } from '@/core/either';
import { Recipient } from '../../../enterprise/entities/recipient';
import { RecipientRepository } from '../../repositories/recipient-repository';
import { AuthorizationService } from '../../services/authorization';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { UserAlreadyExistsError } from '../errors/user-already-exists-error';
interface RegisterRecipientUseCaseRequest {
    creatorId: string;
    name: string;
    email: string;
    address: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type RegisterRecipientUseCaseResponse = Either<AuthorizationError | UserAlreadyExistsError, Recipient>;
export declare class RegisterRecipientUseCase {
    private recipientRepository;
    private authorizationService;
    constructor(recipientRepository: RecipientRepository, authorizationService: AuthorizationService);
    execute({ creatorId, name, email, address, }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse>;
}
export {};
