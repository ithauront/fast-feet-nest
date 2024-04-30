import { InMemoryAdminRepository } from '../../../../../../test/repositories/in-memory-admin-repository'
import { makeAdmin } from 'test/factories/make-admin'
import { MarkAdminAsActiveUseCase } from './mark-admin-as-active'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InvalidActionError } from '../errors/invalid-action-error'

let inMemoryAdminRepository: InMemoryAdminRepository
let mockAuthorizationService: MockAuthorizationService

let sut: MarkAdminAsActiveUseCase

describe('Mark admin as active tests', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new MarkAdminAsActiveUseCase(
      inMemoryAdminRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can mark a admin as active', async () => {
    const creatorId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(creatorId)

    const admin = makeAdmin({ isActive: false })
    await inMemoryAdminRepository.create(admin)
    const adminId = admin.id.toString()

    expect(inMemoryAdminRepository.items[0].isActive).toBe(false)
    expect(inMemoryAdminRepository.items[0].updatedAt).toBe(undefined)
    const result = await sut.execute({
      creatorId: adminId,
      adminId,
    })

    if (result.isRight()) {
      expect(inMemoryAdminRepository.items[0].isActive).toEqual(true)
      expect(inMemoryAdminRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
    }
  })

  test('If cannot mark as active if adminId is wrong', async () => {
    const creatorId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(creatorId)
    const adminId = 'wrong admin id'

    const result = await sut.execute({
      creatorId,
      adminId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
  test('if creator is not admin it cannot mark  admin as active', async () => {
    const creatorId = 'Invalid user'
    mockAuthorizationService.addFailAuthorizationForId(creatorId)
    const admin = makeAdmin({ isActive: false })
    await inMemoryAdminRepository.create(admin)
    const adminId = admin.id.toString()

    const result = await sut.execute({
      creatorId,
      adminId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If inactive admin cannot mark admin as active', async () => {
    const creatorId = 'Inactive admin'
    mockAuthorizationService.addInactiveAdminId(creatorId)
    const admin = makeAdmin({ isActive: false })
    await inMemoryAdminRepository.create(admin)
    const adminId = admin.id.toString()

    const result = await sut.execute({
      creatorId,
      adminId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if throw error when creator is not an known user', async () => {
    const admin = makeAdmin({ isActive: false })
    await inMemoryAdminRepository.create(admin)
    expect(inMemoryAdminRepository.items[0].isActive).toEqual(false)
    const adminId = admin.id.toString()

    const creatorId = 'unknown user'

    const result = await sut.execute({
      creatorId,
      adminId,
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
  test('if cannot reactivate initial admin', async () => {
    const initialAdminId = new UniqueEntityId('01')
    const admin = makeAdmin({ isActive: false }, initialAdminId)
    await inMemoryAdminRepository.create(admin)
    expect(inMemoryAdminRepository.items[0].isActive).toEqual(false)
    expect(inMemoryAdminRepository.items[0].id.toString()).toEqual('01')
    const adminId = admin.id.toString()

    const creatorId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(creatorId)

    const result = await sut.execute({
      creatorId,
      adminId,
    })
    expect(result.isLeft()).toBe(true)

    const error = result.value
    expect(error).toBeInstanceOf(InvalidActionError)
    if (error instanceof InvalidActionError) {
      const expectedErrorMessage = 'The initial admin cannot be reactivated.'
      expect(error.message).toEqual(expectedErrorMessage)
    }
  })
})
