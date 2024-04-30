import { Either } from '@/core/either';
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error';
import { PackageItemRepository } from '../../repositories/package-item-repository';
import { PackageItemAttachmentRepository } from '../../repositories/package-item-attachment-repository';
import { PackageItem } from '@/domain/delivery/enterprise/entities/package-item';
interface EditPackageItemAttachmentUseCaseRequest {
    packageItemId: string;
    attachmentIds: string[];
}
type EditPackageItemAttachmentUseCaseResponse = Either<PackageItemNotFoundError, PackageItem>;
export declare class EditPackageItemAttachmentUseCase {
    private packageItemRepository;
    private packageItemAttachmentRepository;
    constructor(packageItemRepository: PackageItemRepository, packageItemAttachmentRepository: PackageItemAttachmentRepository);
    execute({ packageItemId, attachmentIds, }: EditPackageItemAttachmentUseCaseRequest): Promise<EditPackageItemAttachmentUseCaseResponse>;
}
export {};
