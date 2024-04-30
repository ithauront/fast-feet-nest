import { AssingPackageItemToCourierUseCase } from './assing-package-item-to-courier-use-case'
import { InMemoryPackageItemRepository } from '../../../../../../test/repositories/in-memory-package-item-repository'
import { makePackageItem } from 'test/factories/make-package-item'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { InMemoryAttachmentsRepository } from '../../../../../../test/repositories/in-memory-attachment-repository'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'

let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let mockAuthorizationService: MockAuthorizationService
let sut: AssingPackageItemToCourierUseCase

describe('Assing package to courier test', () => {
  beforeEach(() => {
    inMemoryPackageItemAttachmentsRepository =
      new InMemoryPackageItemAttachmentRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryPackageItemRepository = new InMemoryPackageItemRepository(
      inMemoryPackageItemAttachmentsRepository,
      inMemoryAttachmentsRepository,
    )
    mockAuthorizationService = new MockAuthorizationService()
    sut = new AssingPackageItemToCourierUseCase(
      inMemoryPackageItemRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })
  test('if can assing package to courier', async () => {
    const newPackage = makePackageItem()
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = newPackage.id.toString()
    const courierId = '1'

    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      packageId,
      courierId,
    })
    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      const packageItem = result.value
      expect(inMemoryPackageItemRepository.items[0].title).toEqual(
        newPackage.title,
      )
      expect(packageItem.courierId?.toString()).toEqual(courierId)
    }
  })
  test('if throw error when package is not found', async () => {
    const newPackage = makePackageItem()
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = 'wrong package id'
    const courierId = '1'

    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      packageId,
      courierId,
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PackageItemNotFoundError)
  })
  test('if throw error when creator is not admin', async () => {
    const newPackage = makePackageItem()
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = 'wrong package id'
    const courierId = '1'

    const adminId = 'Not admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      packageId,
      courierId,
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if throw error when creator is an admin inactive', async () => {
    const newPackage = makePackageItem()
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = 'wrong package id'
    const courierId = '1'

    const adminId = 'Inactive admin'
    mockAuthorizationService.addInactiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      packageId,
      courierId,
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if throw error when creator is not an authorized user', async () => {
    const newPackage = makePackageItem()
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = 'wrong package id'
    const courierId = '1'

    const adminId = 'unknown user'

    const result = await sut.execute({
      creatorId: adminId,
      packageId,
      courierId,
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
