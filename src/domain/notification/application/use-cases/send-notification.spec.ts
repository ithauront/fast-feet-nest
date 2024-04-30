import { InMemoryNotificationsRepository } from '../../../../../test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: SendNotificationUseCase

describe('send notification test', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  test('if can send an notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'notification',
      content: 'this notification content',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.notification.content).toEqual(
      'this notification content',
    )
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
    expect(inMemoryNotificationsRepository.items[0].createdAt).toEqual(
      expect.any(Date),
    )
  })
})
