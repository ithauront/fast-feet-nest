import { makePackageItem } from 'test/factories/make-package-item'
import { OnMarkedAsLost } from './on-marked-as-lost'
import { InMemoryPackageItemRepository } from 'test/repositories/in-memory-package-item-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { MockInstance, vi } from 'vitest'
import { waitFor } from 'test/utils/wait-for'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachment-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase
let sendNotificationExecuteMock: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('on package item marked as lost', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )
    sendNotificationExecuteMock = vi.spyOn(sendNotificationUseCase, 'execute')
    new OnMarkedAsLost(sendNotificationUseCase)

    vi.clearAllMocks()
  })

  test('if send notification when package item is marked as lost', async () => {
    const packageItem = makePackageItem()
    await inMemoryPackageItemRepository.create(packageItem)
    packageItem.markAsLost(new UniqueEntityId('creatorId'))
    await inMemoryPackageItemRepository.save(packageItem)

    await waitFor(() => {
      expect(sendNotificationExecuteMock).toHaveBeenCalled()
    })
    expect(inMemoryNotificationsRepository.items[0].title).toEqual(
      'Change status in your package',
    )
    expect(inMemoryNotificationsRepository.items[0].content).toEqual(
      'Your package is now Lost',
    )
  })
})
