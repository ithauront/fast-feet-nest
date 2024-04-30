import { Either } from '@/core/either';
import { Courier } from '../../../enterprise/entities/courier';
import { CourierRepository } from '../../repositories/courier-repository';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { AuthorizationService } from '../../services/authorization';
interface GrantAdminStatusToCourierUseCaseRequest {
    creatorId: string;
    courierId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type GrantAdminStatusToCourierUseCaseResponse = Either<AuthorizationError, Courier>;
export declare class GrantAdminStatusToCourierUseCase {
    private courierRepository;
    private authorizationService;
    constructor(courierRepository: CourierRepository, authorizationService: AuthorizationService);
    execute({ creatorId, courierId, }: GrantAdminStatusToCourierUseCaseRequest): Promise<GrantAdminStatusToCourierUseCaseResponse>;
}
export {};
