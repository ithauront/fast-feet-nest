import { Either } from '@/core/either';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { AuthorizationService } from '../../../application/services/authorization';
import { PackageItemRepository } from '../../repositories/package-item-repository';
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details';
interface ListCourierPackageItemsOfSameAddressUseCaseRequest {
    page: number;
    creatorId: string;
    courierId: string;
    address: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type ListCourierPackageItemsOfSameAddressUseCaseResponse = Either<AuthorizationError, {
    packageItems: PackageItemWithDetails[];
}>;
export declare class ListCourierPackageItemsOfSameAddressUseCase {
    private packageItemRepository;
    private authorizationService;
    constructor(packageItemRepository: PackageItemRepository, authorizationService: AuthorizationService);
    execute({ creatorId, courierId, page, address, }: ListCourierPackageItemsOfSameAddressUseCaseRequest): Promise<ListCourierPackageItemsOfSameAddressUseCaseResponse>;
}
export {};
