import { BasicEntityProps, Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
export interface AttachmentProps extends BasicEntityProps {
    title: string;
    link: string;
}
export declare class Attachment extends Entity<AttachmentProps> {
    get title(): string;
    get link(): string;
    static create(props: AttachmentProps, id?: UniqueEntityId): Attachment;
}
