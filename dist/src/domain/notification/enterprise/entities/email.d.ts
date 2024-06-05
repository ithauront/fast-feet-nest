import { BasicEntityProps, Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';
export interface EmailProps extends BasicEntityProps {
    recipientEmail: string;
    subject: string;
    body: string;
    sentAt?: Date;
}
export declare class Email extends Entity<EmailProps> {
    get recipientEmail(): string;
    get subject(): string;
    get body(): string;
    get sentAt(): Date | undefined;
    static create(props: Optional<EmailProps, 'sentAt'>, id?: UniqueEntityId): Email;
}
