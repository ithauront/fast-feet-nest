import { Either } from '@/core/either';
import { Recipient } from '../../../enterprise/entities/recipient';
import { RecipientRepository } from '../../repositories/recipient-repository';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { AuthorizationService } from '../../services/authorization';
interface ListRecipientsUseCaseRequest {
    page: number;
    creatorId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type ListRecipientsUseCaseResponse = Either<AuthorizationError, {
    recipients: Recipient[];
}>;
export declare class ListRecipientsUseCase {
    private recipientRepository;
    private authorizationService;
    constructor(recipientRepository: RecipientRepository, authorizationService: AuthorizationService);
    execute({ creatorId, page, }: ListRecipientsUseCaseRequest): Promise<ListRecipientsUseCaseResponse>;
}
export {};
