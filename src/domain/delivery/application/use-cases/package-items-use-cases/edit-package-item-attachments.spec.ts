import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'
import { InMemoryPackageItemRepository } from '../../../../../../test/repositories/in-memory-package-item-repository'
import { EditPackageItemAttachmentUseCase } from './edit-package-item-attachments'
import { makePackageItem } from 'test/factories/make-package-item'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makePackageItemAttachments } from 'test/factories/make-package-item-attachment'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import { InMemoryAttachmentsRepository } from '../../../../../../test/repositories/in-memory-attachment-repository'
import { makeAttachment } from 'test/factories/make-attachment'

let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let inMemoryPackageItemAttachmentRepository: InMemoryPackageItemAttachmentRepository
let sut: EditPackageItemAttachmentUseCase

describe('edit package item attachments', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    inMemoryPackageItemAttachmentRepository =
      new InMemoryPackageItemAttachmentRepository()
    sut = new EditPackageItemAttachmentUseCase(
      inMemoryPackageItemRepository,
      inMemoryPackageItemAttachmentRepository,
      inMemoryAttachmentsRepository,
    )
  })
  test('if can edit package item attachments using id', async () => {
    const newPackageItem = makePackageItem(
      { status: PackageStatus.DELIVERED },
      new UniqueEntityId('id-1'),
    )

    await inMemoryPackageItemRepository.create(newPackageItem)
    const attachment1 = makeAttachment(
      { title: 'Attachment 1', link: 'link1' },
      new UniqueEntityId('1'),
    )
    const attachment2 = makeAttachment(
      { title: 'Attachment 2', link: 'link2' },
      new UniqueEntityId('2'),
    )
    const attachment3 = makeAttachment(
      { title: 'Attachment 3', link: 'link3' },
      new UniqueEntityId('3'),
    )

    await inMemoryAttachmentsRepository.create(attachment1)
    await inMemoryAttachmentsRepository.create(attachment2)
    await inMemoryAttachmentsRepository.create(attachment3)

    await inMemoryPackageItemAttachmentRepository.items.push(
      makePackageItemAttachments({
        packageItemId: newPackageItem.id,
        attachmentId: new UniqueEntityId('1'),
        attachment: attachment1,
      }),
    )
    await inMemoryPackageItemAttachmentRepository.items.push(
      makePackageItemAttachments({
        packageItemId: newPackageItem.id,
        attachmentId: new UniqueEntityId('2'),
        attachment: attachment2,
      }),
    )

    await sut.execute({
      packageItemId: 'id-1',
      attachmentIds: ['1', '3'],
    })
    expect(inMemoryPackageItemRepository.items[0].id).toEqual(
      new UniqueEntityId('id-1'),
    )
    expect(
      inMemoryPackageItemRepository.items[0].attachment.currentItems,
    ).toHaveLength(2)
    expect(
      inMemoryPackageItemRepository.items[0].attachment.currentItems,
    ).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('3'),
      }),
    ])
  })
  test('if return an error when trying to edit attachments of a non-delivered package', async () => {
    const newPackageItem = makePackageItem(
      {
        status: PackageStatus.IN_TRANSIT,
      },
      new UniqueEntityId('id-1'),
    )

    await inMemoryPackageItemRepository.create(newPackageItem)

    const result = await sut.execute({
      packageItemId: 'id-1',
      attachmentIds: ['1', '2'],
    })

    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(PackageItemNotFoundError)
      expect(result.value.message).toEqual(
        'The package has not been delivered yet. Please wait until you have the package in your hands before uploading any feedback.',
      )
    }
  })

  test('if can edit package item attachments and not change immutable attachment', async () => {
    const newPackageItem = makePackageItem(
      { status: PackageStatus.DELIVERED },
      new UniqueEntityId('id-1'),
    )

    await inMemoryPackageItemRepository.create(newPackageItem)
    const attachment1 = makeAttachment(
      { title: 'Attachment 1', link: 'link1' },
      new UniqueEntityId('1'),
    )
    const attachment2 = makeAttachment(
      { title: 'Attachment 2', link: 'link2' },
      new UniqueEntityId('2'),
    )
    const attachment3 = makeAttachment(
      { title: 'Attachment 3', link: 'link3' },
      new UniqueEntityId('3'),
    )
    const attachment4 = makeAttachment(
      { title: 'Attachment 4', link: 'link4' },
      new UniqueEntityId('4'),
    )

    await inMemoryAttachmentsRepository.create(attachment1)
    await inMemoryAttachmentsRepository.create(attachment2)
    await inMemoryAttachmentsRepository.create(attachment3)
    await inMemoryAttachmentsRepository.create(attachment4)

    await inMemoryPackageItemAttachmentRepository.items.push(
      makePackageItemAttachments({
        packageItemId: newPackageItem.id,
        attachmentId: new UniqueEntityId('1'),
        isImmutable: true,
        attachment: attachment1,
      }),
    )
    expect(inMemoryPackageItemAttachmentRepository.items[0].isImmutable).toBe(
      true,
    )
    await inMemoryPackageItemAttachmentRepository.items.push(
      makePackageItemAttachments({
        packageItemId: newPackageItem.id,
        attachmentId: new UniqueEntityId('2'),
        attachment: attachment2,
      }),
    )

    await sut.execute({
      packageItemId: 'id-1',
      attachmentIds: ['3', '4'],
    })
    expect(inMemoryPackageItemRepository.items[0].id).toEqual(
      new UniqueEntityId('id-1'),
    )
    expect(
      inMemoryPackageItemRepository.items[0].attachment.currentItems,
    ).toHaveLength(3)
    expect(
      inMemoryPackageItemRepository.items[0].attachment.currentItems,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('3'),
          isImmutable: false,
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('4'),
          isImmutable: false,
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
          isImmutable: true,
        }),
      ]),
    )
  })
})
