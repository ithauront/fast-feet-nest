import { Either } from '@/core/either';
import { Courier } from '../../../enterprise/entities/courier';
import { CourierRepository } from '../../repositories/courier-repository';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { AuthorizationService } from '../../services/authorization';
interface MarkCourierAsOnVacationUseCaseRequest {
    creatorId: string;
    courierId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type MarkCourierAsOnVacationUseCaseResponse = Either<AuthorizationError | UserNotFoundError, Courier>;
export declare class MarkCourierAsOnVacationUseCase {
    private courierRepository;
    private authorizationService;
    constructor(courierRepository: CourierRepository, authorizationService: AuthorizationService);
    execute({ creatorId, courierId, }: MarkCourierAsOnVacationUseCaseRequest): Promise<MarkCourierAsOnVacationUseCaseResponse>;
}
export {};
