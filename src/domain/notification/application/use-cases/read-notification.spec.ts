import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'
import { makeNotification } from 'test/factories/make-notification'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { UnauthorizedError } from '@/core/error/errors/unauthorized-error'
import { ResourceNotFoundError } from '@/core/error/errors/Resource-not-found-error'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('read notification test', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  test('if can read a notification', async () => {
    const notification = makeNotification()
    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: notification.recipientId.toString(),
    })

    if (result.isRight()) {
      expect(result.value?.notification.title).toEqual(notification.title)
      expect(inMemoryNotificationsRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
      expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
        expect.any(Date),
      )
    }
  })
  test('if cannot read notification of other recipient', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityId('recipient 1'),
    })
    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient 2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
  test('if notification dont exist return error', async () => {
    const notification = makeNotification()

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId: 'recipient 2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
