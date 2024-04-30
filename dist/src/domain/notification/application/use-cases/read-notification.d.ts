import { Either } from '@/core/either';
import { Notification } from '../../enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notification-repository';
import { UnauthorizedError } from '@/core/error/errors/unauthorized-error';
import { ResourceNotFoundError } from '@/core/error/errors/Resource-not-found-error';
interface ReadNotificationUseCaseRequest {
    notificationId: string;
    recipientId: string;
}
type ReadNotificationUseCaseResponse = Either<UnauthorizedError | ResourceNotFoundError, {
    notification: Notification;
}>;
export declare class ReadNotificationUseCase {
    private notificationRepository;
    constructor(notificationRepository: NotificationsRepository);
    execute({ notificationId, recipientId, }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse>;
}
export {};
