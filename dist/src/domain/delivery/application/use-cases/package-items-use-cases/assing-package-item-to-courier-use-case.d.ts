import { Either } from '@/core/either';
import { PackageItem } from '../../../enterprise/entities/package-item';
import { PackageItemRepository } from '../../repositories/package-item-repository';
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { AuthorizationService } from '../../services/authorization';
interface AssingPackageItemToCourierUseCaseRequest {
    creatorId: string;
    packageId: string;
    courierId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type AssingPackageItemToCourierUseCaseResponse = Either<AuthorizationError | PackageItemNotFoundError, PackageItem>;
export declare class AssingPackageItemToCourierUseCase {
    private packageItemRepository;
    private authorizationService;
    constructor(packageItemRepository: PackageItemRepository, authorizationService: AuthorizationService);
    execute({ creatorId, packageId, courierId, }: AssingPackageItemToCourierUseCaseRequest): Promise<AssingPackageItemToCourierUseCaseResponse>;
}
export {};
