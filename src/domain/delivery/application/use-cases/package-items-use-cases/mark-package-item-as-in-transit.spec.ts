import { makeCourier } from 'test/factories/make-courier'
import { MarkPackageItemAsInTransitUseCase } from './mark-package-item-as-in-transit'
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

let sut: MarkPackageItemAsInTransitUseCase

describe('Mark package item as in transit tests', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    mockAuthorizationService = new MockAuthorizationService()

    sut = new MarkPackageItemAsInTransitUseCase(
      inMemoryPackageItemRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If a courier can mark a package item assigned to him as in transit', async () => {
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
    })

    if (result.isRight()) {
      expect(inMemoryPackageItemRepository.items[0].status).toEqual(
        'In Transit',
      )
      expect(inMemoryPackageItemRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
    }
  })
  test('If a admin can mark a package item as in transit', async () => {
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
      expect(inMemoryPackageItemRepository.items[0].status).toEqual(
        'In Transit',
      )
      expect(inMemoryPackageItemRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
    }
  })
  test('If cannot mark a package item as in transit if packageId is wrong', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const packageItem = makePackageItem({
      status: PackageStatus.AWAITING_PICKUP,
    })
    const wrongPackageItemId = 'wrong package item Id'
    await inMemoryPackageItemRepository.create(packageItem)

    expect(inMemoryPackageItemRepository.items[0].status).toEqual(
      'Awaiting Pickup',
    )

    const result = await sut.execute({
      creatorId: adminId,
      packageItemId: wrongPackageItemId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PackageItemNotFoundError)
  })

  test('if user is not admin or courier assigned to package cannot mark package item as in transit', async () => {
    const adminId = 'Invalid admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)
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
  test('If inactive admin cannot mark package item as in transit', async () => {
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
