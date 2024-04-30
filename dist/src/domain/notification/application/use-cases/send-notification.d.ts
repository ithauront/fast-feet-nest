import { Either } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notification-repository';
export interface SendNotificationUseCaseRequest {
    recipientId: string;
    title: string;
    content: string;
}
export type SendNotificationUseCaseResponse = Either<null, {
    notification: Notification;
}>;
export declare class SendNotificationUseCase {
    private notificationRepository;
    constructor(notificationRepository: NotificationsRepository);
    execute({ recipientId, title, content, }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse>;
}
