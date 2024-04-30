import { LogEntry } from '../../enterprise/logs/logEntry';
export interface LogsRepository {
    create(log: LogEntry): Promise<void>;
}
