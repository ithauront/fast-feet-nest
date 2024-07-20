import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PackageStatus as EntityPackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import { LogEntry } from '@/domain/delivery/enterprise/logs/logEntry'
import {
  LogEntry as PrismaLog,
  Prisma,
  PackageStatus as PrismaPackageStatus,
} from '@prisma/client'

export class PrismaLogMapper {
  static PackageStatusMapping = {
    [EntityPackageStatus.AWAITING_PICKUP]: PrismaPackageStatus.AWAITING_PICKUP,
    [EntityPackageStatus.IN_TRANSIT]: PrismaPackageStatus.IN_TRANSIT,
    [EntityPackageStatus.DELIVERED]: PrismaPackageStatus.DELIVERED,
    [EntityPackageStatus.RETURNED]: PrismaPackageStatus.RETURNED,
    [EntityPackageStatus.LOST]: PrismaPackageStatus.LOST,
  }

  static mapStatusForPrisma(status: EntityPackageStatus): PrismaPackageStatus {
    const mappedStatus = this.PackageStatusMapping[status]
    if (!mappedStatus) {
      throw new Error(`Invalid status for mapping: ${status}`)
    }
    return mappedStatus
  }

  static toDomain(raw: PrismaLog): LogEntry {
    return new LogEntry(
      new UniqueEntityId(raw.id),
      new UniqueEntityId(raw.packageItemId),
      EntityPackageStatus[
        raw.previousState as keyof typeof EntityPackageStatus
      ],
      EntityPackageStatus[raw.newState as keyof typeof EntityPackageStatus],
      new UniqueEntityId(raw.changedBy),
      raw.changedAt,
    )
  }

  static toPrisma(log: LogEntry): Prisma.LogEntryUncheckedCreateInput {
    return {
      id: log.id.toString(),
      packageItemId: log.packageItemId.toString(),
      previousState: PrismaLogMapper.mapStatusForPrisma(log.previousState),
      newState: this.mapStatusForPrisma(log.newState),
      changedBy: log.changedBy.toString(),
      changedAt: log.changedAt,
    }
  }
}
