import { Either, left, right } from '@/core/either'
import { Notification } from '../../enterprise/entities/notification'
import { NotificationsRepository } from '../repositories/notification-repository'
import { UnauthorizedError } from '@/core/error/errors/unauthorized-error'
import { ResourceNotFoundError } from '@/core/error/errors/Resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface ReadNotificationUseCaseRequest {
  notificationId: string
  recipientId: string
}
type ReadNotificationUseCaseResponse = Either<
  UnauthorizedError | ResourceNotFoundError,
  {
    notification: Notification
  }
>

@Injectable()
export class ReadNotificationUseCase {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute({
    notificationId,
    recipientId,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification =
      await this.notificationRepository.findById(notificationId)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientId !== notification.recipientId.toString()) {
      return left(new UnauthorizedError())
    }

    notification.read()

    await this.notificationRepository.save(notification)

    return right({ notification })
  }
}
