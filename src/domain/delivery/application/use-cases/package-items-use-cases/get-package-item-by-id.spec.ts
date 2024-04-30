import { GetPackageItemByIdUseCase } from './get-package-item-by-id'
import { InMemoryPackageItemRepository } from '../../../../../../test/repositories/in-memory-package-item-repository'
import { makePackageItem } from 'test/factories/make-package-item'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { PackageItemNotFoundError } from '../errors/package-item-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { makeCourier } from 'test/factories/make-courier'
import { makeAdmin } from 'test/factories/make-admin'
import { InMemoryAttachmentsRepository } from '../../../../../../test/repositories/in-memory-attachment-repository'
import { InMemoryPackageItemAttachmentRepository } from 'test/repositories/in-memory-package-item-attachment-repository'
import { makePackageItemAttachments } from 'test/factories/make-package-item-attachment'
import { makeAttachment } from 'test/factories/make-attachment'

let inMemoryPackageItemAttachmentsRepository: InMemoryPackageItemAttachmentRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryPackageItemRepository: InMemoryPackageItemRepository
let mockAuthorizationService: MockAuthorizationService
let sut: GetPackageItemByIdUseCase

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
    sut = new GetPackageItemByIdUseCase(
      inMemoryPackageItemRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })
  test('if courier assinged to the package can get the package', async () => {
    const courier = makeCourier()
    const newPackage = makePackageItem({ courierId: courier.id })
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = newPackage.id.toString()
    const courierId = courier.id.toString()

    const result = await sut.execute({
      creatorId: courierId,
      packageId,
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
  test('if throw error when package is not found because it does not exists', async () => {
    const courier = makeCourier()

    const packageId = 'any package id'
    const courierId = courier.id.toString()

    const result = await sut.execute({
      creatorId: courierId,
      packageId,
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(PackageItemNotFoundError)
  })
  test('if throw error when creator is not admin and not courier assinged to package', async () => {
    const courier = makeCourier()
    const newPackage = makePackageItem({ courierId: courier.id })
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = newPackage.id.toString()

    const otherCourier = makeCourier()
    const otherCourierId = otherCourier.id.toString()
    mockAuthorizationService.addFailAuthorizationForId(otherCourierId)

    const result = await sut.execute({
      creatorId: otherCourierId,
      packageId,
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if throw error when creator is an admin inactive', async () => {
    const courier = makeCourier()
    const newPackage = makePackageItem({ courierId: courier.id })
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = newPackage.id.toString()

    const adminId = 'Inactive admin'
    mockAuthorizationService.addInactiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      packageId,
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if throw error when creator is not an authorized user', async () => {
    const courier = makeCourier()
    const newPackage = makePackageItem({ courierId: courier.id })
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = newPackage.id.toString()

    const adminId = 'unknown user'

    const result = await sut.execute({
      creatorId: adminId,
      packageId,
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
  test('if admin can get package item', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()
    const newPackage = makePackageItem({ courierId: courier.id })
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = newPackage.id.toString()
    const admin = makeAdmin()
    const adminId = admin.id.toString()
    mockAuthorizationService.addInactiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      packageId,
    })
    if (result.isRight()) {
      const packageItem = result.value
      expect(inMemoryPackageItemRepository.items[0].title).toEqual(
        newPackage.title,
      )
      expect(packageItem.courierId?.toString()).toEqual(courierId)
    }
  })
  test('if throw error when wrong packageId sent', async () => {
    const courier = makeCourier()
    const newPackage = makePackageItem({ courierId: courier.id })
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = 'wrong package id'

    const result = await sut.execute({
      creatorId: courier.id.toString(),
      packageId,
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(PackageItemNotFoundError)
  })
  test('if package item also show its attachments', async () => {
    const courier = makeCourier()
    const courierId = courier.id.toString()

    const newPackage = makePackageItem({ courierId: courier.id })

    const attachment = makeAttachment({ title: 'attachment' })

    inMemoryAttachmentsRepository.items.push(attachment)

    inMemoryPackageItemAttachmentsRepository.items.push(
      makePackageItemAttachments({
        attachmentId: attachment.id,
        packageItemId: newPackage.id,
      }),
    )
    await inMemoryPackageItemRepository.create(newPackage)
    const packageId = newPackage.id.toString()
    const admin = makeAdmin()
    const adminId = admin.id.toString()
    mockAuthorizationService.addInactiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      packageId,
    })
    if (result.isRight()) {
      const packageItem = result.value
      expect(inMemoryPackageItemRepository.items[0].title).toEqual(
        newPackage.title,
      )
      expect(packageItem.courierId?.toString()).toEqual(courierId)
      expect(packageItem.attachments[0].title).toEqual('attachment')
    }
  })
})
