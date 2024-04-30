import { Either } from '@/core/either';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { AuthorizationService } from '../../../application/services/authorization';
import { PackageItemRepository } from '../../repositories/package-item-repository';
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details';
interface ListReturnedPackageItemToAdminUseCaseRequest {
    page: number;
    creatorId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type ListReturnedPackageItemToAdminUseCaseResponse = Either<AuthorizationError, {
    packageItems: PackageItemWithDetails[];
}>;
export declare class ListReturnedPackageItemToAdminUseCase {
    private packageItemRepository;
    private authorizationService;
    constructor(packageItemRepository: PackageItemRepository, authorizationService: AuthorizationService);
    execute({ creatorId, page, }: ListReturnedPackageItemToAdminUseCaseRequest): Promise<ListReturnedPackageItemToAdminUseCaseResponse>;
}
export {};
