import { makePackageItem } from 'test/factories/make-package-item'
import { OnMarkedAsInTransit } from './on-marked-as-in-transit'
import { InMemoryPackageItemRepository } from 'test/repositories/in-memory-package-item-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { MockInstance, vi } from 'vitest'
import { waitFor } from 'test/utils/wait-for'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachment-repository'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'
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

describe('on package item marked as in transit', () => {
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
    new OnMarkedAsInTransit(sendNotificationUseCase)

    vi.clearAllMocks()
  })

  test('if send notification when package item is marked as in transit', async () => {
    const packageItem = makePackageItem()
    await inMemoryPackageItemRepository.create(packageItem)
    packageItem.markAsInTransit(new UniqueEntityId('creatorId'))
    await inMemoryPackageItemRepository.save(packageItem)

    await waitFor(() => {
      expect(sendNotificationExecuteMock).toHaveBeenCalled()
    })
    expect(inMemoryNotificationsRepository.items[0].title).toEqual(
      'Change status in your package',
    )
  })
})
