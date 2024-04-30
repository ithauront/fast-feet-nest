import { makeCourier } from 'test/factories/make-courier'
import { MarkPackageItemAsLostUseCase } from './mark-package-item-as-lost'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { InMemoryPackageItemRepository } from '../../../../../../test/repositories/in-memory-package-item-repository'
import { makePackageItem } from 'test/factories/make-package-item'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import { InMemoryAttachmentsRepository } from '../../../../../../test/repositories/in-memory-attachment-repository'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'

let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let mockAuthorizationService: MockAuthorizationService
let sut: MarkPackageItemAsLostUseCase

describe('Mark package item as lost tests', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    mockAuthorizationService = new MockAuthorizationService()
    sut = new MarkPackageItemAsLostUseCase(
      inMemoryPackageItemRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If a admin can mark a package item as lost', async () => {
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
    })

    if (result.isRight()) {
      expect(inMemoryPackageItemRepository.items[0].status).toEqual('Lost')
      expect(inMemoryPackageItemRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
    }
  })
  test('If a courier cannot mark a package item assigned to him as lost (this action is reserved to admins)', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()
    mockAuthorizationService.addFailAuthorizationForId(courierId)
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
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If cannot mark a package item as lost if packageId is wrong', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const packageItem = makePackageItem({
      status: PackageStatus.AWAITING_PICKUP,
    })

    await inMemoryPackageItemRepository.create(packageItem)

    expect(inMemoryPackageItemRepository.items[0].status).toEqual(
      'Awaiting Pickup',
    )
    const wrongPackageItemId = 'wrong package item Id'

    const result = await sut.execute({
      creatorId: adminId,
      packageItemId: wrongPackageItemId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PackageItemNotFoundError)
  })

  test('If inactive admin cannot mark package item as lost', async () => {
    const adminId = 'Inactive admin'
    mockAuthorizationService.addInactiveAdminId(adminId)
    const courier = makeCourier()
    const packageItem = makePackageItem({
      courierId: courier.id,
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItemId = packageItem.id.toString()
    await inMemoryPackageItemRepository.create(packageItem)

    const result = await sut.execute({
      creatorId: adminId,
      packageItemId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
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
    })

    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
