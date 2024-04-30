import { PackageItem } from '../../../enterprise/entities/package-item';
import { PackageItemRepository } from '../../repositories/package-item-repository';
import { Either } from '@/core/either';
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { AuthorizationService } from '../../services/authorization';
interface CreatePackageItemUseCaseRequest {
    creatorId: string;
    title: string;
    deliveryAddress: string;
    recipientId: string;
    courierId?: string;
}
type AuthorizationError = UnauthorizedAdminError | NotFoundOrUnauthorizedError;
type CreatePackageItemUseCaseResponse = Either<AuthorizationError, PackageItem>;
export declare class CreatePackageItemUseCase {
    private packageItemRepository;
    private authorizationService;
    constructor(packageItemRepository: PackageItemRepository, authorizationService: AuthorizationService);
    execute({ creatorId, title, deliveryAddress, recipientId, courierId, }: CreatePackageItemUseCaseRequest): Promise<CreatePackageItemUseCaseResponse>;
}
export {};
