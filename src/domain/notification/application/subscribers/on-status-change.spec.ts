import { makePackageItem } from 'test/factories/make-package-item'
import { InMemoryPackageItemRepository } from 'test/repositories/in-memory-package-item-repository'
import {
  SendEmailUseCase,
  SendEmailUseCaseRequest,
  SendEmailUseCaseResponse,
} from '../use-cases/send-email'
import { InMemoryEmailRepository } from 'test/repositories/in-memory-email-repository'
import { MockInstance, vi } from 'vitest'
import { waitFor } from 'test/utils/wait-for'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachment-repository'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { OnStatusChange } from './on-status-change'
import { InMemoryRecipientRepository } from 'test/repositories/in-memory-recipient-repository'
import { MockEmailService } from 'test/mock/mock-email-service'
import { makeRecipient } from 'test/factories/make-recipient'

let mockEmailService: MockEmailService
let inMemoryRecipientRespository: InMemoryRecipientRepository
let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let inMemoryEmailRepository: InMemoryEmailRepository
let sendEmailUseCase: SendEmailUseCase
let sendEmailExecuteMock: MockInstance<
  [SendEmailUseCaseRequest],
  Promise<SendEmailUseCaseResponse>
>

describe('on package item marked as in transit', () => {
  beforeAll(() => {
    mockEmailService = new MockEmailService()
    inMemoryRecipientRespository = new InMemoryRecipientRepository()
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
  })
  beforeEach(() => {
    inMemoryEmailRepository = new InMemoryEmailRepository()
    sendEmailUseCase = new SendEmailUseCase(
      inMemoryEmailRepository,
      mockEmailService,
    )
    sendEmailExecuteMock = vi.spyOn(sendEmailUseCase, 'execute')
    new OnStatusChange(sendEmailUseCase, inMemoryRecipientRespository)

    vi.clearAllMocks()
  })

  test('if send email when package item is marked as in transit', async () => {
    const recipient = makeRecipient()
    await inMemoryRecipientRespository.create(recipient)
    const packageItem = makePackageItem({ recipientId: recipient.id })
    await inMemoryPackageItemRepository.create(packageItem)
    packageItem.markAsInTransit(new UniqueEntityId('creatorId'))
    await inMemoryPackageItemRepository.save(packageItem)

    await waitFor(() => {
      expect(sendEmailExecuteMock).toHaveBeenCalled()
    })
    expect(inMemoryEmailRepository.items[0].subject).toEqual(
      'Change status in your package',
    )
    expect(inMemoryEmailRepository.items[0].body).toEqual(
      `Your package of id ${packageItem.id} is now ${packageItem.status}`,
    )
  })
  test('if send email when package item is marked as returned', async () => {
    const recipient = makeRecipient()
    await inMemoryRecipientRespository.create(recipient)
    const packageItem = makePackageItem({ recipientId: recipient.id })
    await inMemoryPackageItemRepository.create(packageItem)
    packageItem.markAsReturned(new UniqueEntityId('creator id'))
    await inMemoryPackageItemRepository.save(packageItem)

    await waitFor(() => {
      expect(sendEmailExecuteMock).toHaveBeenCalled()
    })
    expect(inMemoryEmailRepository.items[0].subject).toEqual(
      'Change status in your package',
    )
    expect(inMemoryEmailRepository.items[0].body).toEqual(
      `Your package of id ${packageItem.id} is now Returned`,
    )
  })
  test('if send email when package item is marked as lost', async () => {
    const recipient = makeRecipient()
    await inMemoryRecipientRespository.create(recipient)
    const packageItem = makePackageItem({ recipientId: recipient.id })
    await inMemoryPackageItemRepository.create(packageItem)
    packageItem.markAsLost(new UniqueEntityId('creatorId'))
    await inMemoryPackageItemRepository.save(packageItem)

    await waitFor(() => {
      expect(sendEmailExecuteMock).toHaveBeenCalled()
    })
    expect(inMemoryEmailRepository.items[0].subject).toEqual(
      'Change status in your package',
    )
    expect(inMemoryEmailRepository.items[0].body).toEqual(
      `Your package of id ${packageItem.id} is now Lost`,
    )
  })
  test('if send email when package item is marked as delivered', async () => {
    const recipient = makeRecipient()
    await inMemoryRecipientRespository.create(recipient)
    const packageItem = makePackageItem({ recipientId: recipient.id })
    await inMemoryPackageItemRepository.create(packageItem)
    packageItem.markAsDelivered(new UniqueEntityId('creator id'))
    await inMemoryPackageItemRepository.save(packageItem)

    await waitFor(() => {
      expect(sendEmailExecuteMock).toHaveBeenCalled()
    })
    expect(inMemoryEmailRepository.items[0].subject).toEqual(
      'Change status in your package',
    )
    expect(inMemoryEmailRepository.items[0].body).toEqual(
      `Your package of id ${packageItem.id} is now Delivered`,
    )
  })
})
