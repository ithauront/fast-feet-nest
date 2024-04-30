import { LogsRepository } from '@/domain/delivery/application/repositories/logs-repository'
import { LogEntry } from '@/domain/delivery/enterprise/logs/logEntry'

export class InMemoryLogsRepository implements LogsRepository {
  public items: LogEntry[] = []

  async create(log: LogEntry) {
    this.items.push(log)
  }
}
