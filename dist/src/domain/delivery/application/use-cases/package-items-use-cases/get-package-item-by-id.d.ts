import { Either } from '@/core/either';
import { PackageItemRepository } from '../../repositories/package-item-repository';
import { AuthorizationService } from '../../../application/services/authorization';
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error';
import { PackageItemWithDetails } from '@/domain/delivery/enterprise/entities/value-object/package-item-with-details';
interface GetPackageItemByIdUseCaseRequest {
    creatorId: string;
    packageId: string;
}
type AssingPackageItemUseCaseResponse = Either<PackageItemNotFoundError, PackageItemWithDetails>;
export declare class GetPackageItemByIdUseCase {
    private packageItemRepository;
    private authorizationService;
    constructor(packageItemRepository: PackageItemRepository, authorizationService: AuthorizationService);
    execute({ creatorId, packageId, }: GetPackageItemByIdUseCaseRequest): Promise<AssingPackageItemUseCaseResponse>;
}
export {};
