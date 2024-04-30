import { InMemoryPackageItemRepository } from '../../../../../../test/repositories/in-memory-package-item-repository'
import { CreatePackageItemUseCase } from './create-package-item'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { InMemoryAttachmentsRepository } from '../../../../../../test/repositories/in-memory-attachment-repository'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'

let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let mockAuthorizationService: MockAuthorizationService
let sut: CreatePackageItemUseCase

describe('Create package item tests', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    mockAuthorizationService = new MockAuthorizationService()
    sut = new CreatePackageItemUseCase(
      inMemoryPackageItemRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })
  test('If can create a package item', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      title: 'New Package',
      deliveryAddress: 'Recipient address',
      recipientId: '1',
    })
    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const packageItem = result.value
      expect(inMemoryPackageItemRepository.items[0].title).toEqual(
        'New Package',
      )
      expect(packageItem.recipientId?.toString()).toEqual('1')
    }
  })
  test('If can create a package item already with courier assinged', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      title: 'New Package',
      deliveryAddress: 'Recipient address',
      recipientId: '1',
      courierId: '1',
    })
    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const packageItem = result.value
      expect(inMemoryPackageItemRepository.items[0].title).toEqual(
        'New Package',
      )
      expect(packageItem.courierId?.toString()).toEqual('1')
    }
  })
  test('if user is not admin it cannot create package', async () => {
    const adminId = 'invalid Admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      title: 'New Package',
      deliveryAddress: 'Recipient address',
      recipientId: '1',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If inactive admin cannot create a package item', async () => {
    const adminId = 'invalid Admin'
    mockAuthorizationService.addInactiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      title: 'New Package',
      deliveryAddress: 'Recipient address',
      recipientId: '1',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if creator is not found or unauthorized, it should return NotFoundOrUnauthorizedError', async () => {
    const unknownAdminId = 'unknownAdminId'

    const result = await sut.execute({
      creatorId: unknownAdminId,
      title: 'New Package',
      deliveryAddress: 'Recipient address',
      recipientId: '1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
