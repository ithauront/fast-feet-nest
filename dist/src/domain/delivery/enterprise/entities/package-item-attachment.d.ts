import { BasicEntityProps, Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
export interface PackageItemAttachmentProps extends BasicEntityProps {
    packageItemId: UniqueEntityId;
    attachmentId: UniqueEntityId;
    isImmutable?: boolean;
}
export declare class PackageItemAttachment extends Entity<PackageItemAttachmentProps> {
    get packageItemId(): UniqueEntityId;
    get attachmentId(): UniqueEntityId;
    get isImmutable(): boolean;
    static create(props: Optional<PackageItemAttachmentProps, 'isImmutable'>, id?: UniqueEntityId): PackageItemAttachment;
}
