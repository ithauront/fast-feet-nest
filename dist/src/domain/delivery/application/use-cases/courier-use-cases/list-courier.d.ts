import { Either } from '@/core/either';
import { Courier } from '../../../enterprise/entities/courier';
import { CourierRepository } from '../../repositories/courier-repository';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { AuthorizationService } from '../../services/authorization';
interface ListCourierUseCaseRequest {
    page: number;
    creatorId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type ListCourierUseCaseResponse = Either<AuthorizationError, {
    courier: Courier[];
}>;
export declare class ListCourierUseCase {
    private courierRepository;
    private authorizationService;
    constructor(courierRepository: CourierRepository, authorizationService: AuthorizationService);
    execute({ creatorId, page, }: ListCourierUseCaseRequest): Promise<ListCourierUseCaseResponse>;
}
export {};
