import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { InMemoryPackageItemRepository } from '../../../../../../test/repositories/in-memory-package-item-repository'
import { ListCourierPackageItemUseCase } from './list-courier-package-items'
import { makeCourier } from 'test/factories/make-courier'
import { makePackageItem } from 'test/factories/make-package-item'
import { InMemoryAttachmentsRepository } from '../../../../../../test/repositories/in-memory-attachment-repository'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'
import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import { makeAttachment } from 'test/factories/make-attachment'
import { makePackageItemAttachments } from 'test/factories/make-package-item-attachment'

let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let mockAuthorizationService: MockAuthorizationService

let sut: ListCourierPackageItemUseCase

describe('List courier package items tests', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    mockAuthorizationService = new MockAuthorizationService()

    sut = new ListCourierPackageItemUseCase(
      inMemoryPackageItemRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If a courier can list his package items', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier.id,
      title: 'package1',
    })
    const packageItem2 = makePackageItem({
      courierId: courier.id,
      title: 'package2',
    })
    const packageItem3 = makePackageItem({
      courierId: courier.id,
      title: 'package3',
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
      expect(result.value).toEqual([
        expect.objectContaining({ title: 'package1' }),
        expect.objectContaining({ title: 'package2' }),
        expect.objectContaining({ title: 'package3' }),
      ])
    }
  })
  test('If admin can list a courier package items', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courier = makeCourier()
    const courierId = courier.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier.id,
      title: 'package1',
    })
    const packageItem2 = makePackageItem({
      courierId: courier.id,
      title: 'package2',
    })
    const packageItem3 = makePackageItem({
      courierId: courier.id,
      title: 'package3',
    })
    await inMemoryPackageItemRepository.create(packageItem1)
    await inMemoryPackageItemRepository.create(packageItem2)
    await inMemoryPackageItemRepository.create(packageItem3)

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value).toEqual([
        expect.objectContaining({ title: 'package1' }),
        expect.objectContaining({ title: 'package2' }),
        expect.objectContaining({ title: 'package3' }),
      ])
    }
  })
  test('If a courier that is not admin cannot list other courier package items', async () => {
    const courier1 = makeCourier()
    const courier1Id = courier1.id.toString()
    mockAuthorizationService.addFailAuthorizationForId(courier1Id)
    const courier2 = makeCourier()
    const courier2Id = courier2.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier2.id,
      title: 'package1',
    })
    const packageItem2 = makePackageItem({
      courierId: courier2.id,
      title: 'package2',
    })
    const packageItem3 = makePackageItem({
      courierId: courier2.id,
      title: 'package3',
    })
    await inMemoryPackageItemRepository.create(packageItem1)
    await inMemoryPackageItemRepository.create(packageItem2)
    await inMemoryPackageItemRepository.create(packageItem3)

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
    })
    const packageItem2 = makePackageItem({
      courierId: courier2.id,
      title: 'package2',
    })
    const packageItem3 = makePackageItem({
      courierId: courier2.id,
      title: 'package3',
    })
    await inMemoryPackageItemRepository.create(packageItem1)
    await inMemoryPackageItemRepository.create(packageItem2)
    await inMemoryPackageItemRepository.create(packageItem3)

    const result = await sut.execute({
      creatorId: courier2Id,
      courierId: courier2Id,
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value).toEqual([
        expect.objectContaining({ title: 'package2' }),
        expect.objectContaining({ title: 'package3' }),
      ])
    }
  })
  test('If unknown user cannot list courier package items', async () => {
    const unknownUserId = 'unknown user'
    const courier2 = makeCourier()
    const courier2Id = courier2.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier2.id,
      title: 'package1',
    })
    const packageItem2 = makePackageItem({
      courierId: courier2.id,
      title: 'package2',
    })
    const packageItem3 = makePackageItem({
      courierId: courier2.id,
      title: 'package3',
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
        makePackageItem({ courierId: courier.id }),
      )
    }

    const result = await sut.execute({
      creatorId: courierId,
      courierId,
      page: 2,
    })

    if (result.isRight()) {
      expect(result.value).toHaveLength(2)
    }
  })

  test('If an inactive admin cannot list courier packages', async () => {
    const InactiveAdminId = 'Inactive Admin'
    mockAuthorizationService.addInactiveAdminId(InactiveAdminId)
    const courier = makeCourier()
    const courierId = courier.id.toString()
    const packageItem1 = makePackageItem({
      courierId: courier.id,
      title: 'package1',
    })
    const packageItem2 = makePackageItem({
      courierId: courier.id,
      title: 'package2',
    })
    const packageItem3 = makePackageItem({
      courierId: courier.id,
      title: 'package3',
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
  test('If a courier dont have any package items return empty array', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()

    const result = await sut.execute({
      creatorId: courierId,
      courierId,
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value).toEqual([])
    }
  })
  test('If couriers package items include attachments it should show', async () => {
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

    const attachment2 = makeAttachment({ title: 'attachment 2' })

    inMemoryAttachmentsRepository.items.push(attachment2)

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
      expect(result.value).toHaveLength(2)
      expect(result.value[0].title).toEqual('package1')
      expect(result.value[0].attachments).toEqual([])
      expect(result.value[1].title).toEqual('package2')
      expect(result.value[1].attachments[0].title).toEqual('attachment 2')
    }
  })
})
