import { Either } from '@/core/either';
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error';
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error';
import { PackageItemRepository } from '../../repositories/package-item-repository';
import { InvalidActionError } from '../errors/invalid-action-error';
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item';
interface MarkPackageItemAsDeliveredUseCaseRequest {
    creatorId: string;
    packageItemId: string;
    attachmentIds: string[];
}
type MarkPackageItemAsDeliveredUseCaseResponse = Either<UnauthorizedAdminError | PackageItemNotFoundError | InvalidActionError, PackageItem>;
export declare class MarkPackageItemAsDeliveredUseCase {
    private packageItemRepository;
    constructor(packageItemRepository: PackageItemRepository);
    execute({ creatorId, packageItemId, attachmentIds, }: MarkPackageItemAsDeliveredUseCaseRequest): Promise<MarkPackageItemAsDeliveredUseCaseResponse>;
}
export {};
