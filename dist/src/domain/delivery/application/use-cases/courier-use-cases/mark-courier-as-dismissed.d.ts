import { Either } from '@/core/either';
import { Courier } from '../../../enterprise/entities/courier';
import { CourierRepository } from '../../repositories/courier-repository';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { AuthorizationService } from '../../services/authorization';
interface MarkCourierAsDismissedUseCaseRequest {
    creatorId: string;
    courierId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type MarkCourierAsDismissedUseCaseResponse = Either<AuthorizationError | UserNotFoundError, Courier>;
export declare class MarkCourierAsDismissedUseCase {
    private courierRepository;
    private authorizationService;
    constructor(courierRepository: CourierRepository, authorizationService: AuthorizationService);
    execute({ creatorId, courierId, }: MarkCourierAsDismissedUseCaseRequest): Promise<MarkCourierAsDismissedUseCaseResponse>;
}
export {};
