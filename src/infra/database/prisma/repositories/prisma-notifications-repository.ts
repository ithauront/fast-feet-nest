import { NotificationsRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'
import { PrismaService } from '../prisma.service'
import { PrismaNotificationsMapper } from '../mappers/prisma-notifications-mapper'

export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}
  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findFirst({
      where: { id },
    })

    if (!notification) {
      return null
    }
    return PrismaNotificationsMapper.toDomain(notification)
  }

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationsMapper.toPrisma(notification)
    await this.prisma.notification.create({
      data,
    })
  }

  async save(notification: Notification): Promise<void> {
    const data = PrismaNotificationsMapper.toPrisma(notification)

    await this.prisma.notification.update({
      where: { id: data.id },
      data,
    })
  }
}
