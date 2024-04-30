import { EventHandler } from '@/core/events/event-handler';
import { SendNotificationUseCase } from '../use-cases/send-notification';
export declare class OnMarkedAsLost implements EventHandler {
    private sendNotification;
    constructor(sendNotification: SendNotificationUseCase);
    setupSubscriptions(): void;
    private sendMarkAsLostNotification;
}
