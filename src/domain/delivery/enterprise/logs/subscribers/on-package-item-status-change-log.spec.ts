import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachment-repository'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'
import { InMemoryPackageItemRepository } from 'test/repositories/in-memory-package-item-repository'
import { OnPackageItemStatusChangeLog } from './on-package-item-status-change-log'
import { InMemoryLogsRepository } from 'test/repositories/in-memory-logs-repository'
import { makePackageItem } from 'test/factories/make-package-item'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { waitFor } from 'test/utils/wait-for'
import { MockInstance } from 'vitest'
import { PackageStatus } from '../../entities/package-item'

let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let inMemoryLogsRepository: InMemoryLogsRepository
let createLogEntrySpy: MockInstance

describe('log subscriber tests', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    inMemoryLogsRepository = new InMemoryLogsRepository()
    createLogEntrySpy = vi.spyOn(inMemoryLogsRepository, 'create')
    new OnPackageItemStatusChangeLog(inMemoryLogsRepository)
  })

  test('if create log when package item status is changed', async () => {
    const creatorId = new UniqueEntityId('creator id')
    const packageItem = makePackageItem()
    await inMemoryPackageItemRepository.create(packageItem)

    packageItem.markAsDelivered(creatorId)
    await inMemoryPackageItemRepository.save(packageItem)

    await waitFor(() => {
      expect(createLogEntrySpy).toHaveBeenCalled()
    })

    const expectedLogEntry = {
      changedBy: creatorId,
      previousState: PackageStatus.AWAITING_PICKUP,
      newState: PackageStatus.DELIVERED,
      packageItemId: packageItem.id,
    }

    expect(createLogEntrySpy).toHaveBeenCalledWith(
      expect.objectContaining(expectedLogEntry),
    )

    expect(inMemoryLogsRepository.items[0].changedBy).toEqual(
      new UniqueEntityId('creator id'),
    )
  })
})
