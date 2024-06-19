import { LogEntry } from '../../enterprise/logs/logEntry'

export abstract class LogsRepository {
  abstract create(log: LogEntry): Promise<void>
}
