import { Either } from '@/core/either';
import { Recipient } from '../../../enterprise/entities/recipient';
import { RecipientRepository } from '../../repositories/recipient-repository';
import { AuthorizationService } from '../../services/authorization';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
interface GetRecipientEmailUseCaseRequest {
    creatorId: string;
    recipientEmail: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type GetRecipientEmailUseCaseResponse = Either<AuthorizationError | UserNotFoundError, Recipient>;
export declare class GetRecipientEmailUseCase {
    private recipientRepository;
    private authorizationService;
    constructor(recipientRepository: RecipientRepository, authorizationService: AuthorizationService);
    execute({ creatorId, recipientEmail, }: GetRecipientEmailUseCaseRequest): Promise<GetRecipientEmailUseCaseResponse>;
}
export {};
