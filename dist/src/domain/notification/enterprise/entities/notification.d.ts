import { BasicEntityProps, Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
export interface NotificationProps extends BasicEntityProps {
    recipientId: UniqueEntityId;
    title: string;
    content: string;
    readAt?: Date;
}
export declare class Notification extends Entity<NotificationProps> {
    get recipientId(): UniqueEntityId;
    get title(): string;
    get content(): string;
    get readAt(): Date | undefined;
    read(): void;
    static create(props: Optional<NotificationProps, 'createdAt'>, id?: UniqueEntityId): Notification;
}
