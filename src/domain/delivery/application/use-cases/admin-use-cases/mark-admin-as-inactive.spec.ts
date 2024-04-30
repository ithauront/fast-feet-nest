import { InMemoryAdminRepository } from '../../../../../../test/repositories/in-memory-admin-repository'
import { makeAdmin } from 'test/factories/make-admin'
import { MarkAdminAsInactiveUseCase } from './mark-admin-as-inactive'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'

let inMemoryAdminRepository: InMemoryAdminRepository
let mockAuthorizationService: MockAuthorizationService

let sut: MarkAdminAsInactiveUseCase

describe('Mark admin as inactive tests', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new MarkAdminAsInactiveUseCase(
      inMemoryAdminRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can mark a admin as inactive', async () => {
    const creatorId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(creatorId)

    const admin = makeAdmin()
    await inMemoryAdminRepository.create(admin)
    const adminId = admin.id.toString()

    expect(inMemoryAdminRepository.items[0].isActive).toBe(true)
    expect(inMemoryAdminRepository.items[0].updatedAt).toBe(undefined)
    const result = await sut.execute({
      creatorId: adminId,
      adminId,
    })

    if (result.isRight()) {
      expect(inMemoryAdminRepository.items[0].isActive).toEqual(false)
      expect(inMemoryAdminRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
    }
  })

  test('If cannot mark as inactive if adminId is wrong', async () => {
    const creatorId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(creatorId)
    const adminId = '1'

    const result = await sut.execute({
      creatorId,
      adminId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
  test('if creator is not admin it cannot mark  admin as inactive', async () => {
    const creatorId = 'Invalid user'
    mockAuthorizationService.addFailAuthorizationForId(creatorId)
    const admin = makeAdmin()
    await inMemoryAdminRepository.create(admin)
    const adminId = admin.id.toString()

    const result = await sut.execute({
      creatorId,
      adminId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If inactive admin cannot mark admin as inactive', async () => {
    const creatorId = 'Invactive admin'
    mockAuthorizationService.addInactiveAdminId(creatorId)
    const admin = makeAdmin()
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
    const admin = makeAdmin()
    await inMemoryAdminRepository.create(admin)
    expect(inMemoryAdminRepository.items[0].isActive).toEqual(true)
    const adminId = admin.id.toString()

    const creatorId = 'unknown user'

    const result = await sut.execute({
      creatorId,
      adminId,
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
