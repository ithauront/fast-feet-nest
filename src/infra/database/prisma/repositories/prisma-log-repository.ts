import { LogsRepository } from '@/domain/delivery/application/repositories/logs-repository'
import { LogEntry } from '@/domain/delivery/enterprise/logs/logEntry'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaLogRepository implements LogsRepository {
  constructor(private prisma: PrismaService) {}

  create(log: LogEntry): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
