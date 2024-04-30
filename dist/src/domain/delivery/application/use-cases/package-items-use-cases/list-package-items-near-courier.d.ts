import { Either } from '@/core/either';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { PackageItemRepository } from '../../repositories/package-item-repository';
import { UserNotFoundError } from '../errors/user-not-found-error';
import { CourierRepository } from '../../repositories/courier-repository';
import { GeoLocationProvider } from '../../services/geo-locationProvider';
import { AuthorizationService } from '../../services/authorization';
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details';
interface ListPackageItemsNearCourierUseCaseRequest {
    page: number;
    creatorId: string;
    courierId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type ListPackageItemsNearCourierUseCaseResponse = Either<AuthorizationError | UserNotFoundError, {
    packageItems: PackageItemWithDetails[];
}>;
export declare class ListPackageItemsNearCourierUseCase {
    private packageItemRepository;
    private courierRepository;
    private geoLocationProvider;
    private authorizationService;
    constructor(packageItemRepository: PackageItemRepository, courierRepository: CourierRepository, geoLocationProvider: GeoLocationProvider, authorizationService: AuthorizationService);
    execute({ creatorId, courierId, page, }: ListPackageItemsNearCourierUseCaseRequest): Promise<ListPackageItemsNearCourierUseCaseResponse>;
}
export {};
