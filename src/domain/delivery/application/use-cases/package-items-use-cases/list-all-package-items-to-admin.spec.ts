import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { InMemoryPackageItemRepository } from '../../../../../../test/repositories/in-memory-package-item-repository'
import { ListAllPackageItemsToAdminUseCase } from './list-all-package-items-to-admin'
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

let sut: ListAllPackageItemsToAdminUseCase

describe('List all package items to an admin tests', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    mockAuthorizationService = new MockAuthorizationService()

    sut = new ListAllPackageItemsToAdminUseCase(
      inMemoryPackageItemRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If a admin can list all package items', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const courier1 = makeCourier()

    const courier2 = makeCourier()

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
      creatorId: adminId,
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
  test('If courier that is admin can list all package items', async () => {
    const courier1 = makeCourier()
    const courier1Id = courier1.id.toString()
    mockAuthorizationService.addActiveAdminId(courier1Id)

    const courier2 = makeCourier()

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
      creatorId: courier1Id,
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
  test('If a user that is not admin cannot list all package items', async () => {
    const courier1 = makeCourier()
    const courier1Id = courier1.id.toString()
    mockAuthorizationService.addFailAuthorizationForId(courier1Id)
    const courier2 = makeCourier()
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
      creatorId: courier1Id,

      page: 1,
    })
    if (result.isLeft()) {
      expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
      expect(result.value.message).toEqual(
        'This action is only allowed to active admins',
      )
    }
  })

  test('If unknown user cannot list all package items', async () => {
    const unknownUserId = 'unknown user'
    const courier1 = makeCourier()
    const courier2 = makeCourier()
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
      creatorId: unknownUserId,
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
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courier1 = makeCourier()
    const courier2 = makeCourier()
    for (let i = 1; i <= 22; i++) {
      await inMemoryPackageItemRepository.create(
        makePackageItem({ courierId: courier1.id }),
      )
    }
    for (let i = 1; i <= 22; i++) {
      await inMemoryPackageItemRepository.create(
        makePackageItem({ courierId: courier2.id }),
      )
    }

    const result = await sut.execute({
      creatorId: adminId,
      page: 3,
    })

    if (result.isRight()) {
      expect(result.value).toHaveLength(4)
    }
  })

  test('If an inactive admin cannot list all packages items', async () => {
    const InactiveAdminId = 'Inactive Admin'
    mockAuthorizationService.addInactiveAdminId(InactiveAdminId)
    const courier1 = makeCourier()
    const courier2 = makeCourier()
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
      creatorId: InactiveAdminId,
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If zero package items exists return empty array', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,

      page: 1,
    })
    if (result.isRight()) {
      expect(result.value).toEqual([])
    }
  })
  test('If package items include attachments it should show', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const courier = makeCourier()

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
      creatorId: adminId,
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
