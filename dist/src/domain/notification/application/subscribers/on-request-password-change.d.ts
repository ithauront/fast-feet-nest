import { EventHandler } from '@/core/events/event-handler';
import { SendEmailUseCase } from '../use-cases/send-email';
export declare class OnRequestPasswordChange implements EventHandler {
    private sendEmail;
    constructor(sendEmail: SendEmailUseCase);
    setupSubscriptions(): void;
    private sendRequestPasswordChangeEmail;
}
