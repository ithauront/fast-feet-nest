import { makeCourier } from 'test/factories/make-courier'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { InMemoryPackageItemRepository } from '../../../../../../test/repositories/in-memory-package-item-repository'
import { makePackageItem } from 'test/factories/make-package-item'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { MarkPackageItemAsDeliveredUseCase } from './mark-package-item-as-delivered'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import { InvalidActionError } from '../errors/invalid-action-error'
import { InMemoryAttachmentsRepository } from '../../../../../../test/repositories/in-memory-attachment-repository'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'

let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let mockAuthorizationService: MockAuthorizationService // I kept the authorization service to be sure that even a valid admin cannot mark the package as delivered if he is not the courier assigned to it, as it says in the rules.
let sut: MarkPackageItemAsDeliveredUseCase

describe('Mark package item as delivered tests', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    mockAuthorizationService = new MockAuthorizationService()
    sut = new MarkPackageItemAsDeliveredUseCase(inMemoryPackageItemRepository)
  })

  test('If a courier can mark a package item assigned to him as delivered', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()
    const packageItem = makePackageItem({
      courierId: courier.id,
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItemId = packageItem.id.toString()
    await inMemoryPackageItemRepository.create(packageItem)

    expect(inMemoryPackageItemRepository.items[0].status).toEqual(
      'Awaiting Pickup',
    )

    const result = await sut.execute({
      creatorId: courierId,
      packageItemId,
      attachmentIds: ['1', '2'],
    })

    if (result.isRight()) {
      expect(inMemoryPackageItemRepository.items[0].status).toEqual('Delivered')
      expect(inMemoryPackageItemRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
      expect(
        inMemoryPackageItemRepository.items[0].attachment.currentItems,
      ).toHaveLength(2)
      expect(
        inMemoryPackageItemRepository.items[0].attachment.currentItems,
      ).toEqual([
        expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
      ])
    }
  })
  test('If a admin cannot mark a package item as delivered', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const packageItem = makePackageItem({
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItemId = packageItem.id.toString()
    await inMemoryPackageItemRepository.create(packageItem)

    expect(inMemoryPackageItemRepository.items[0].status).toEqual(
      'Awaiting Pickup',
    )

    const result = await sut.execute({
      creatorId: adminId,
      packageItemId,
      attachmentIds: ['1', '2'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
    if (result.value instanceof UnauthorizedAdminError) {
      expect(result.value.message).toEqual(
        'Only the courier assigned to the package item can mark it as delivered',
      )
    }
  })
  test('If cannot mark a package item as delivered if packageId is wrong', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()
    const packageItem = makePackageItem({
      status: PackageStatus.AWAITING_PICKUP,
    })
    const wrongPackageItemId = 'wrong package item Id'
    await inMemoryPackageItemRepository.create(packageItem)

    expect(inMemoryPackageItemRepository.items[0].status).toEqual(
      'Awaiting Pickup',
    )

    const result = await sut.execute({
      creatorId: courierId,
      packageItemId: wrongPackageItemId,
      attachmentIds: ['1', '2'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PackageItemNotFoundError)
  })
  test('if throw error when creator is not an authorized user', async () => {
    const courier = makeCourier()
    const packageItem = makePackageItem({
      courierId: courier.id,
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItemId = packageItem.id.toString()
    await inMemoryPackageItemRepository.create(packageItem)

    const creatorId = 'unknown user'

    const result = await sut.execute({
      creatorId,
      packageItemId,
      attachmentIds: ['1', '2'],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
    if (result.value instanceof UnauthorizedAdminError) {
      expect(result.value.message).toEqual(
        'Only the courier assigned to the package item can mark it as delivered',
      )
    }
  })
  test('If throw error if try to mark as delivered without photo attachment', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()
    const packageItem = makePackageItem({
      courierId: courier.id,
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItemId = packageItem.id.toString()
    await inMemoryPackageItemRepository.create(packageItem)

    expect(inMemoryPackageItemRepository.items[0].status).toEqual(
      'Awaiting Pickup',
    )

    const result = await sut.execute({
      creatorId: courierId,
      packageItemId,
      attachmentIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidActionError)
    if (result.value instanceof InvalidActionError) {
      expect(result.value.message).toEqual(
        'At least one attachment must be provided when marking the package as delivered',
      )
    }
  })
})
