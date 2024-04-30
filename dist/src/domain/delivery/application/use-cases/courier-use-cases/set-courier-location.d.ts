import { Either } from '@/core/either';
import { Courier } from '../../../enterprise/entities/courier';
import { CourierRepository } from '../../repositories/courier-repository';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { GeoLocationProvider } from '../../services/geo-locationProvider';
interface SetCourierLocationUseCaseRequest {
    creatorId: string;
    ip: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type SetCourierLocationUseCaseResponse = Either<AuthorizationError | UserNotFoundError, Courier>;
export declare class SetCourierLocationUseCase {
    private courierRepository;
    private geoLocationProvider;
    constructor(courierRepository: CourierRepository, geoLocationProvider: GeoLocationProvider);
    execute({ creatorId, ip, }: SetCourierLocationUseCaseRequest): Promise<SetCourierLocationUseCaseResponse>;
}
export {};
