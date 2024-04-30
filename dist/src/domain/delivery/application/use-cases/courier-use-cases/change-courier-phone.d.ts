import { Either } from '@/core/either';
import { Courier } from '@/domain/delivery/enterprise/entities/courier';
import { CourierRepository } from '../../repositories/courier-repository';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { AuthorizationService } from '../../services/authorization';
interface ChangeCourierPhoneUseCaseRequest {
    creatorId: string;
    courierId: string;
    phone: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type ChangeCourierPhoneUseCaseResponse = Either<AuthorizationError | UserNotFoundError, Courier>;
export declare class ChangeCourierPhoneUseCase {
    private courierRepository;
    private authorizationService;
    constructor(courierRepository: CourierRepository, authorizationService: AuthorizationService);
    execute({ creatorId, courierId, phone, }: ChangeCourierPhoneUseCaseRequest): Promise<ChangeCourierPhoneUseCaseResponse>;
}
export {};
