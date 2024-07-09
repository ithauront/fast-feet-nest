import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { InMemoryPackageItemRepository } from '../../../../../../test/repositories/in-memory-package-item-repository'
import { makeCourier } from 'test/factories/make-courier'
import { makePackageItem } from 'test/factories/make-package-item'
import { PackageStatus } from '../../../enterprise/entities/package-item'
import { ListPackageItemsNearCourierUseCase } from './list-package-items-near-courier'
import { InMemoryCourierRepository } from '../../../../../../test/repositories/in-memory-courier-repository'
import { MockGeoLocationProvider } from 'test/mock/mock-geo-location-provider'
import { makeAdmin } from 'test/factories/make-admin'
import { GeoLocation } from '@/domain/delivery/enterprise/entities/value-object/geolocation'
import { InMemoryAttachmentsRepository } from '../../../../../../test/repositories/in-memory-attachment-repository'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'

let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let inMemoryCourierRepository: InMemoryCourierRepository
let mockGeoLocationProvider: MockGeoLocationProvider
let mockAuthorizationService: MockAuthorizationService

let sut: ListPackageItemsNearCourierUseCase

describe('List returned package items to admin tests', async () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    inMemoryCourierRepository = new InMemoryCourierRepository()
    mockGeoLocationProvider = new MockGeoLocationProvider()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new ListPackageItemsNearCourierUseCase(
      inMemoryPackageItemRepository,
      inMemoryCourierRepository,
      mockGeoLocationProvider,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
    mockGeoLocationProvider.clear()
  })
  test('if return only the nearby packages to the courier', async () => {
    mockGeoLocationProvider.setMockResponse(
      'address1',
      48.86726696440399,
      2.3338573695049196,
    )
    mockGeoLocationProvider.setMockResponse('address2', 34.0522, -118.2437)

    const courier = makeCourier({
      location: new GeoLocation(48.86726696440399, 2.3338573695049196),
    })
    await inMemoryCourierRepository.create(courier)

    const packageItemNear = makePackageItem({
      deliveryAddress: 'address1',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    const packageItemFar = makePackageItem({
      deliveryAddress: 'address2',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    await inMemoryPackageItemRepository.create(packageItemNear)
    await inMemoryPackageItemRepository.create(packageItemFar)

    const result = await sut.execute({
      creatorId: courier.id.toString(),
      courierId: courier.id.toString(),
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value).toEqual([
        expect.objectContaining({ deliveryAddress: 'address1' }),
      ])
    }
  })
  test('if return the nearby packages to the courier sorted from nearest to farest', async () => {
    mockGeoLocationProvider.setMockResponse(
      'address1',
      48.86726696440399,
      2.3338573695049196,
    )

    mockGeoLocationProvider.setMockResponse(
      'address2',
      48.867927643658476,
      2.3336382543525476,
    )
    mockGeoLocationProvider.setMockResponse(
      'address3',
      48.869194430141505,
      2.3330106174793923,
    )
    mockGeoLocationProvider.setMockResponse(
      'address4',
      48.86996034942834,
      2.332654437682173,
    )
    mockGeoLocationProvider.setMockResponse('address5', 34.0522, -118.2437)

    const courier = makeCourier({
      location: new GeoLocation(48.86726696440399, 2.3338573695049196),
    })
    await inMemoryCourierRepository.create(courier)

    const packageItemNear1 = makePackageItem({
      deliveryAddress: 'address1',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    const packageItemNear2 = makePackageItem({
      deliveryAddress: 'address2',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    const packageItemNear3 = makePackageItem({
      deliveryAddress: 'address3',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    const packageItemNear4 = makePackageItem({
      deliveryAddress: 'address4',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    const packageItemFar = makePackageItem({
      deliveryAddress: 'address5',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    await inMemoryPackageItemRepository.create(packageItemNear1)
    await inMemoryPackageItemRepository.create(packageItemNear2)
    await inMemoryPackageItemRepository.create(packageItemNear3)
    await inMemoryPackageItemRepository.create(packageItemNear4)
    await inMemoryPackageItemRepository.create(packageItemFar)

    const result = await sut.execute({
      creatorId: courier.id.toString(),
      courierId: courier.id.toString(),
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value).toEqual([
        expect.objectContaining({ deliveryAddress: 'address1' }),
        expect.objectContaining({ deliveryAddress: 'address2' }),
        expect.objectContaining({ deliveryAddress: 'address3' }),
        expect.objectContaining({ deliveryAddress: 'address4' }),
      ])
    }
  })
  test('if packages items far from to the courier(more than 5km) return empty array', async () => {
    mockGeoLocationProvider.setMockResponse(
      'address1',
      48.88441646541392,
      2.2662097547758013,
    )
    mockGeoLocationProvider.setMockResponse('address2', 34.0522, -118.2437)

    const courier = makeCourier({
      location: new GeoLocation(48.86726696440399, 2.3338573695049196),
    })
    await inMemoryCourierRepository.create(courier)

    const packageItemLittleMoreThan5km = makePackageItem({
      deliveryAddress: 'address1',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    const packageItemReallyFar = makePackageItem({
      deliveryAddress: 'address2',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    await inMemoryPackageItemRepository.create(packageItemLittleMoreThan5km)
    await inMemoryPackageItemRepository.create(packageItemReallyFar)

    const result = await sut.execute({
      creatorId: courier.id.toString(),
      courierId: courier.id.toString(),
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value).toEqual([])
    }
  })
  test('if admin can list nearby packages to the courier', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    mockGeoLocationProvider.setMockResponse(
      'address1',
      48.86726696440399,
      2.3338573695049196,
    )
    mockGeoLocationProvider.setMockResponse('address2', 34.0522, -118.2437)

    const courier = makeCourier({
      location: new GeoLocation(48.86726696440399, 2.3338573695049196),
    })
    await inMemoryCourierRepository.create(courier)

    const packageItemNear = makePackageItem({
      deliveryAddress: 'address1',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    const packageItemFar = makePackageItem({
      deliveryAddress: 'address2',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    await inMemoryPackageItemRepository.create(packageItemNear)
    await inMemoryPackageItemRepository.create(packageItemFar)

    const result = await sut.execute({
      creatorId: adminId,
      courierId: courier.id.toString(),
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value).toEqual([
        expect.objectContaining({ deliveryAddress: 'address1' }),
      ])
    }
  })
  test('if different courier that is not admin cannot list nearby packages to the another courier', async () => {
    const differentCourier = makeCourier()
    mockAuthorizationService.addFailAuthorizationForId(
      differentCourier.id.toString(),
    )
    mockGeoLocationProvider.setMockResponse(
      'address1',
      48.86726696440399,
      2.3338573695049196,
    )
    mockGeoLocationProvider.setMockResponse('address2', 34.0522, -118.2437)

    const courier = makeCourier({
      location: new GeoLocation(48.86726696440399, 2.3338573695049196),
    })
    await inMemoryCourierRepository.create(courier)

    const packageItemNear = makePackageItem({
      deliveryAddress: 'address1',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    const packageItemFar = makePackageItem({
      deliveryAddress: 'address2',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    await inMemoryPackageItemRepository.create(packageItemNear)
    await inMemoryPackageItemRepository.create(packageItemFar)

    const result = await sut.execute({
      creatorId: differentCourier.id.toString(),
      courierId: courier.id.toString(),
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if unknown user cannot list nearby packages to the another courier', async () => {
    const differentCourier = makeCourier()

    mockGeoLocationProvider.setMockResponse(
      'address1',
      48.86726696440399,
      2.3338573695049196,
    )
    mockGeoLocationProvider.setMockResponse('address2', 34.0522, -118.2437)

    const courier = makeCourier({
      location: new GeoLocation(48.86726696440399, 2.3338573695049196),
    })
    await inMemoryCourierRepository.create(courier)

    const packageItemNear = makePackageItem({
      deliveryAddress: 'address1',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    const packageItemFar = makePackageItem({
      deliveryAddress: 'address2',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    await inMemoryPackageItemRepository.create(packageItemNear)
    await inMemoryPackageItemRepository.create(packageItemFar)

    const result = await sut.execute({
      creatorId: differentCourier.id.toString(),
      courierId: courier.id.toString(),
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
  test('if inactive admin cannot list nearby packages to the a courier', async () => {
    const inactiveAdmin = makeAdmin()
    mockAuthorizationService.addInactiveAdminId(inactiveAdmin.id.toString())
    mockGeoLocationProvider.setMockResponse(
      'address1',
      48.86726696440399,
      2.3338573695049196,
    )
    mockGeoLocationProvider.setMockResponse('address2', 34.0522, -118.2437)

    const courier = makeCourier({
      location: new GeoLocation(48.86726696440399, 2.3338573695049196),
    })
    await inMemoryCourierRepository.create(courier)

    const packageItemNear = makePackageItem({
      deliveryAddress: 'address1',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    const packageItemFar = makePackageItem({
      deliveryAddress: 'address2',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    await inMemoryPackageItemRepository.create(packageItemNear)
    await inMemoryPackageItemRepository.create(packageItemFar)

    const result = await sut.execute({
      creatorId: inactiveAdmin.id.toString(),
      courierId: courier.id.toString(),
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if nearby items are assinged to other courier it should not show', async () => {
    mockGeoLocationProvider.setMockResponse(
      'address1',
      48.86726696440399,
      2.3338573695049196,
    )
    mockGeoLocationProvider.setMockResponse('address2', 34.0522, -118.2437)
    const courier = makeCourier()
    await inMemoryCourierRepository.create(courier)

    const otherCourier = makeCourier({
      location: new GeoLocation(48.86726696440399, 2.3338573695049196),
    })
    await inMemoryCourierRepository.create(otherCourier)

    const packageItemNear = makePackageItem({
      deliveryAddress: 'address1',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    const packageItemFar = makePackageItem({
      deliveryAddress: 'address2',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    await inMemoryPackageItemRepository.create(packageItemNear)
    await inMemoryPackageItemRepository.create(packageItemFar)

    const result = await sut.execute({
      creatorId: courier.id.toString(),
      courierId: courier.id.toString(),
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value).toEqual([])
    }
  })
  test('if 2 couriers are in the same area show just respective packageItems', async () => {
    mockGeoLocationProvider.setMockResponse(
      'address1',
      48.86726696440399,
      2.3338573695049196,
    )

    mockGeoLocationProvider.setMockResponse(
      'address2',
      48.867927643658476,
      2.3336382543525476,
    )
    mockGeoLocationProvider.setMockResponse(
      'address3',
      48.869194430141505,
      2.3330106174793923,
    )
    mockGeoLocationProvider.setMockResponse(
      'address4',
      48.86996034942834,
      2.332654437682173,
    )
    mockGeoLocationProvider.setMockResponse('address5', 34.0522, -118.2437)

    const courier1 = makeCourier({
      location: new GeoLocation(48.86726696440399, 2.3338573695049196),
    })
    await inMemoryCourierRepository.create(courier1)
    const courier2 = makeCourier({
      location: new GeoLocation(48.86726696440399, 2.3338573695049196),
    })
    await inMemoryCourierRepository.create(courier2)

    const packageItemNear1 = makePackageItem({
      deliveryAddress: 'address1',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier1.id,
    })
    const packageItemNear2 = makePackageItem({
      deliveryAddress: 'address2',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier1.id,
    })
    const packageItemNear3 = makePackageItem({
      deliveryAddress: 'address3',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier1.id,
    })
    const packageItemNear4 = makePackageItem({
      deliveryAddress: 'address4',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier2.id,
    })
    const packageItemFar = makePackageItem({
      deliveryAddress: 'address5',
      status: PackageStatus.IN_TRANSIT,
      courierId: courier2.id,
    })
    await inMemoryPackageItemRepository.create(packageItemNear1)
    await inMemoryPackageItemRepository.create(packageItemNear2)
    await inMemoryPackageItemRepository.create(packageItemNear3)
    await inMemoryPackageItemRepository.create(packageItemNear4)
    await inMemoryPackageItemRepository.create(packageItemFar)

    const result = await sut.execute({
      creatorId: courier2.id.toString(),
      courierId: courier2.id.toString(),
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value).toEqual([
        expect.objectContaining({ deliveryAddress: 'address4' }),
      ])
    }
  })
  test('If can list paginated packageItems', async () => {
    mockGeoLocationProvider.setMockResponse(
      'address1',
      48.86726696440399,
      2.3338573695049196,
    )

    const courier = makeCourier({
      location: new GeoLocation(48.86726696440399, 2.3338573695049196),
    })
    await inMemoryCourierRepository.create(courier)

    for (let i = 1; i <= 22; i++) {
      await inMemoryPackageItemRepository.create(
        makePackageItem({
          deliveryAddress: 'address1',
          status: PackageStatus.IN_TRANSIT,
          courierId: courier.id,
        }),
      )
    }
    for (let i = 1; i <= 22; i++) {
      await inMemoryPackageItemRepository.create(
        makePackageItem({
          courierId: courier.id,
          status: PackageStatus.LOST,
        }),
      )
    }

    const result = await sut.execute({
      creatorId: courier.id.toString(),
      courierId: courier.id.toString(),
      page: 2,
    })

    if (result.isRight()) {
      expect(result.value).toHaveLength(2)
    }
  })
})
