import { Either } from '@/core/either';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error';
import { PackageItemRepository } from '../../repositories/package-item-repository';
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item';
import { AuthorizationService } from '../../services/authorization';
interface MarkPackageItemAsReturnedUseCaseRequest {
    creatorId: string;
    packageItemId: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type MarkPackageItemAsReturnedUseCaseResponse = Either<AuthorizationError | PackageItemNotFoundError, PackageItem>;
export declare class MarkPackageItemAsReturnedUseCase {
    private packageItemRepository;
    private authorizationService;
    constructor(packageItemRepository: PackageItemRepository, authorizationService: AuthorizationService);
    execute({ creatorId, packageItemId, }: MarkPackageItemAsReturnedUseCaseRequest): Promise<MarkPackageItemAsReturnedUseCaseResponse>;
}
export {};
