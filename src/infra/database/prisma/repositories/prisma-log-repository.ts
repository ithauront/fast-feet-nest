import { LogsRepository } from '@/domain/delivery/application/repositories/logs-repository'
import { LogEntry } from '@/domain/delivery/enterprise/logs/logEntry'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaLogMapper } from '../mappers/prisma-log-mapper'

@Injectable()
export class PrismaLogRepository implements LogsRepository {
  constructor(private prisma: PrismaService) {}

  async create(log: LogEntry): Promise<void> {
    const data = PrismaLogMapper.toPrisma(log)
    await this.prisma.logEntry.create({ data })
  }
}
