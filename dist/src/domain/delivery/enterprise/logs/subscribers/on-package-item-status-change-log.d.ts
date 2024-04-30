import { EventHandler } from '@/core/events/event-handler';
import { LogsRepository } from '@/domain/delivery/application/repositories/logs-repository';
export declare class OnPackageItemStatusChangeLog implements EventHandler {
    private logsRepository;
    constructor(logsRepository: LogsRepository);
    setupSubscriptions(): void;
    private packageItemStatusChangeLog;
}
