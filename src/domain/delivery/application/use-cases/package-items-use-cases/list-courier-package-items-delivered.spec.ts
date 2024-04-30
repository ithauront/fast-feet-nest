import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { InMemoryPackageItemRepository } from '../../../../../../test/repositories/in-memory-package-item-repository'
import { makeCourier } from 'test/factories/make-courier'
import { makePackageItem } from 'test/factories/make-package-item'
import { ListCourierPackageItemDeliveredUseCase } from './list-courier-package-items-delivered'
import { PackageStatus } from '../../../enterprise/entities/package-item'
import { InMemoryAttachmentsRepository } from '../../../../../../test/repositories/in-memory-attachment-repository'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'
import { makeAttachment } from 'test/factories/make-attachment'
import { makePackageItemAttachments } from 'test/factories/make-package-item-attachment'

let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let mockAuthorizationService: MockAuthorizationService

let sut: ListCourierPackageItemDeliveredUseCase

describe('List courier package items delivered tests', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    mockAuthorizationService = new MockAuthorizationService()

    sut = new ListCourierPackageItemDeliveredUseCase(
      inMemoryPackageItemRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If a courier can list his delivered package items', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier.id,
      title: 'package1',
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItem2 = makePackageItem({
      courierId: courier.id,
      title: 'package2',
      status: PackageStatus.DELIVERED,
    })
    const packageItem3 = makePackageItem({
      courierId: courier.id,
      title: 'package3',
      status: PackageStatus.DELIVERED,
    })
    await inMemoryPackageItemRepository.create(packageItem1)
    await inMemoryPackageItemRepository.create(packageItem2)
    await inMemoryPackageItemRepository.create(packageItem3)

    expect(inMemoryPackageItemRepository.items[0].status).toEqual(
      'Awaiting Pickup',
    )
    const result = await sut.execute({
      creatorId: courierId,
      courierId,
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value.packageItems).toEqual([
        expect.objectContaining({ title: 'package2' }),
        expect.objectContaining({ title: 'package3' }),
      ])
    }
  })
  test('If admin can list a courier delivered package items', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courier = makeCourier()
    const courierId = courier.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier.id,
      title: 'package1',
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItem2 = makePackageItem({
      courierId: courier.id,
      title: 'package2',
      status: PackageStatus.DELIVERED,
    })
    const packageItem3 = makePackageItem({
      courierId: courier.id,
      title: 'package3',
      status: PackageStatus.DELIVERED,
    })
    await inMemoryPackageItemRepository.create(packageItem1)
    await inMemoryPackageItemRepository.create(packageItem2)
    await inMemoryPackageItemRepository.create(packageItem3)

    expect(inMemoryPackageItemRepository.items[0].status).toEqual(
      'Awaiting Pickup',
    )

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value.packageItems).toEqual([
        expect.objectContaining({ title: 'package2' }),
        expect.objectContaining({ title: 'package3' }),
      ])
    }
  })
  test('If a courier that is not admin cannot list other courier delivered items', async () => {
    const courier1 = makeCourier()
    const courier1Id = courier1.id.toString()
    mockAuthorizationService.addFailAuthorizationForId(courier1Id)
    const courier2 = makeCourier()
    const courier2Id = courier2.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier2.id,
      title: 'package1',
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItem2 = makePackageItem({
      courierId: courier2.id,
      title: 'package2',
      status: PackageStatus.DELIVERED,
    })
    const packageItem3 = makePackageItem({
      courierId: courier2.id,
      title: 'package3',
      status: PackageStatus.DELIVERED,
    })
    await inMemoryPackageItemRepository.create(packageItem1)
    await inMemoryPackageItemRepository.create(packageItem2)
    await inMemoryPackageItemRepository.create(packageItem3)

    expect(inMemoryPackageItemRepository.items[0].status).toEqual(
      'Awaiting Pickup',
    )
    const result = await sut.execute({
      creatorId: courier1Id,
      courierId: courier2Id,
      page: 1,
    })
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
      expect(result.value.message).toEqual(
        'This action is only allowed to active admins',
      )
    }
  })
  test('List Only Assigned Packages for Each Courier', async () => {
    const courier1 = makeCourier()
    const courier2 = makeCourier()
    const courier2Id = courier2.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier1.id,
      title: 'package1',
      status: PackageStatus.DELIVERED,
    })
    const packageItem2 = makePackageItem({
      courierId: courier1.id,
      title: 'package2',
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItem3 = makePackageItem({
      courierId: courier2.id,
      title: 'package3',
      status: PackageStatus.DELIVERED,
    })
    const packageItem4 = makePackageItem({
      courierId: courier2.id,
      title: 'package4',
      status: PackageStatus.AWAITING_PICKUP,
    })
    await inMemoryPackageItemRepository.create(packageItem1)
    await inMemoryPackageItemRepository.create(packageItem2)
    await inMemoryPackageItemRepository.create(packageItem3)
    await inMemoryPackageItemRepository.create(packageItem4)

    expect(inMemoryPackageItemRepository.items[1].status).toEqual(
      'Awaiting Pickup',
    )
    expect(inMemoryPackageItemRepository.items[3].status).toEqual(
      'Awaiting Pickup',
    )

    const result = await sut.execute({
      creatorId: courier2Id,
      courierId: courier2Id,
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value.packageItems).toEqual([
        expect.objectContaining({ title: 'package3' }),
      ])
    }
  })

  test(' If unknown user cannot list courier delivered items', async () => {
    const unknownUserId = 'unknown user'
    const courier2 = makeCourier()
    const courier2Id = courier2.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier2.id,
      title: 'package1',
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItem2 = makePackageItem({
      courierId: courier2.id,
      title: 'package2',
      status: PackageStatus.DELIVERED,
    })
    const packageItem3 = makePackageItem({
      courierId: courier2.id,
      title: 'package3',
      status: PackageStatus.DELIVERED,
    })
    await inMemoryPackageItemRepository.create(packageItem1)
    await inMemoryPackageItemRepository.create(packageItem2)
    await inMemoryPackageItemRepository.create(packageItem3)

    const result = await sut.execute({
      creatorId: unknownUserId,
      courierId: courier2Id,
      page: 1,
    })
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
      expect(result.value.message).toEqual(
        'Creator not found or not authorized.',
      )
    }
  })
  test('If can list paginated packageItems', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()
    for (let i = 1; i <= 22; i++) {
      await inMemoryPackageItemRepository.create(
        makePackageItem({
          courierId: courier.id,
          status: PackageStatus.AWAITING_PICKUP,
        }),
      )
    }
    for (let i = 1; i <= 22; i++) {
      await inMemoryPackageItemRepository.create(
        makePackageItem({
          courierId: courier.id,
          status: PackageStatus.DELIVERED,
        }),
      )
    }

    const result = await sut.execute({
      creatorId: courierId,
      courierId,
      page: 2,
    })

    if (result.isRight()) {
      expect(result.value.packageItems).toHaveLength(2)
    }
  })

  test('If an inactive admin cannot list delivered courier packages', async () => {
    const InactiveAdminId = 'Inactive Admin'
    mockAuthorizationService.addInactiveAdminId(InactiveAdminId)
    const courier = makeCourier()
    const courierId = courier.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier.id,
      title: 'package1',
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItem2 = makePackageItem({
      courierId: courier.id,
      title: 'package2',
      status: PackageStatus.DELIVERED,
    })
    const packageItem3 = makePackageItem({
      courierId: courier.id,
      title: 'package3',
      status: PackageStatus.DELIVERED,
    })
    await inMemoryPackageItemRepository.create(packageItem1)
    await inMemoryPackageItemRepository.create(packageItem2)
    await inMemoryPackageItemRepository.create(packageItem3)

    const result = await sut.execute({
      creatorId: InactiveAdminId,
      courierId,
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If a courier dont have any delivered package items return empty array', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier.id,
      title: 'package1',
      status: PackageStatus.AWAITING_PICKUP,
    })
    const packageItem2 = makePackageItem({
      courierId: courier.id,
      title: 'package2',
      status: PackageStatus.RETURNED,
    })
    const packageItem3 = makePackageItem({
      courierId: courier.id,
      title: 'package3',
      status: PackageStatus.LOST,
    })
    await inMemoryPackageItemRepository.create(packageItem1)
    await inMemoryPackageItemRepository.create(packageItem2)
    await inMemoryPackageItemRepository.create(packageItem3)

    const result = await sut.execute({
      creatorId: courierId,
      courierId,
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value.packageItems).toEqual([])
    }
  })
  test('If couriers delivered package items include attachments', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()

    const packageItem1 = makePackageItem({
      courierId: courier.id,
      title: 'package1',
      status: PackageStatus.DELIVERED,
    })
    const packageItem2 = makePackageItem({
      courierId: courier.id,
      title: 'package2',
      status: PackageStatus.DELIVERED,
    })

    const attachment1 = makeAttachment({ title: 'attachment 1' })
    const attachment2 = makeAttachment({ title: 'attachment 2' })

    inMemoryAttachmentsRepository.items.push(attachment1)
    inMemoryAttachmentsRepository.items.push(attachment2)

    inMemoryPackageItemAttachmentsRepository.items.push(
      makePackageItemAttachments({
        attachmentId: attachment1.id,
        packageItemId: packageItem1.id,
      }),
    )

    inMemoryPackageItemAttachmentsRepository.items.push(
      makePackageItemAttachments({
        attachmentId: attachment2.id,
        packageItemId: packageItem2.id,
      }),
    )

    await inMemoryPackageItemRepository.create(packageItem1)
    await inMemoryPackageItemRepository.create(packageItem2)

    const result = await sut.execute({
      creatorId: courierId,
      courierId,
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value.packageItems).toHaveLength(2)
      expect(result.value.packageItems[0].attachments[0].title).toEqual(
        'attachment 1',
      )
      expect(result.value.packageItems[1].attachments[0].title).toEqual(
        'attachment 2',
      )
    }
  })
})
