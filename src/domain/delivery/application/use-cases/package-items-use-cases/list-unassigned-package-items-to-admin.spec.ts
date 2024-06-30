import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { InMemoryPackageItemRepository } from '../../../../../../test/repositories/in-memory-package-item-repository'
import { ListAllPackageItemsWithoutCourierToAdminUseCase } from './list-unassigned-package-items-to-admin'
import { makeCourier } from 'test/factories/make-courier'
import { makePackageItem } from 'test/factories/make-package-item'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'
import { InMemoryAttachmentsRepository } from '../../../../../../test/repositories/in-memory-attachment-repository'

let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let mockAuthorizationService: MockAuthorizationService
let sut: ListAllPackageItemsWithoutCourierToAdminUseCase

describe('List all unassigned package items to an admin tests', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    mockAuthorizationService = new MockAuthorizationService()

    sut = new ListAllPackageItemsWithoutCourierToAdminUseCase(
      inMemoryPackageItemRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If a admin can list all unassigned package items', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const courier1 = makeCourier()

    const packageItem1 = makePackageItem({
      courierId: courier1.id,
      title: 'package1',
    })
    const packageItem2 = makePackageItem({
      courierId: null,
      title: 'package2',
    })
    const packageItem3 = makePackageItem({
      courierId: null,
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
        expect.objectContaining({ title: 'package2' }),
        expect.objectContaining({ title: 'package3' }),
      ])
    }
  })
  test('If courier that is admin can list all unassigned package items', async () => {
    const courier1 = makeCourier()
    const courier1Id = courier1.id.toString()
    mockAuthorizationService.addActiveAdminId(courier1Id)

    const packageItem1 = makePackageItem({
      courierId: courier1.id,
      title: 'package1',
    })
    const packageItem2 = makePackageItem({
      courierId: null,
      title: 'package2',
    })
    const packageItem3 = makePackageItem({
      courierId: null,
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
        expect.objectContaining({ title: 'package2' }),
        expect.objectContaining({ title: 'package3' }),
      ])
    }
  })
  test('If a user that is not admin cannot list all unassigned package items', async () => {
    const courier1 = makeCourier()
    const courier1Id = courier1.id.toString()
    mockAuthorizationService.addFailAuthorizationForId(courier1Id)

    const packageItem1 = makePackageItem({
      courierId: courier1.id,
      title: 'package1',
    })
    const packageItem2 = makePackageItem({
      courierId: null,
      title: 'package2',
    })
    const packageItem3 = makePackageItem({
      courierId: null,
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

  test('If unknown user cannot list all unassigned package items', async () => {
    const unknownUserId = 'unknown user'
    const courier1 = makeCourier()

    const packageItem1 = makePackageItem({
      courierId: courier1.id,
      title: 'package1',
    })
    const packageItem2 = makePackageItem({
      courierId: null,
      title: 'package2',
    })
    const packageItem3 = makePackageItem({
      courierId: null,
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
  test('If can list paginated unassigned packageItems', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courier1 = makeCourier()

    for (let i = 1; i <= 22; i++) {
      await inMemoryPackageItemRepository.create(
        makePackageItem({ courierId: courier1.id }),
      )
    }
    for (let i = 1; i <= 22; i++) {
      await inMemoryPackageItemRepository.create(
        makePackageItem({ courierId: null }),
      )
    }

    const result = await sut.execute({
      creatorId: adminId,
      page: 2,
    })

    if (result.isRight()) {
      expect(result.value).toHaveLength(2)
    }
  })

  test('If an inactive admin cannot list all unassigned packages items', async () => {
    const InactiveAdminId = 'Inactive Admin'
    mockAuthorizationService.addInactiveAdminId(InactiveAdminId)
    const courier1 = makeCourier()

    const packageItem1 = makePackageItem({
      courierId: courier1.id,
      title: 'package1',
    })
    const packageItem2 = makePackageItem({
      courierId: null,
      title: 'package2',
    })
    const packageItem3 = makePackageItem({
      courierId: null,
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
  test('If zero unassigned package items exists return empty array', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courier1 = makeCourier()

    for (let i = 1; i <= 22; i++) {
      await inMemoryPackageItemRepository.create(
        makePackageItem({ courierId: courier1.id }),
      )
    }

    const result = await sut.execute({
      creatorId: adminId,

      page: 1,
    })
    if (result.isRight()) {
      expect(result.value).toEqual([])
    }
  })
})
