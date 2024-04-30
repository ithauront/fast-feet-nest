import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { RevokeAdminStatusToCourierUseCase } from './revoke-admin-status-to-courier'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'

let inMemoryCourierRepository: InMemoryCourierRepository
let mockAuthorizationService: MockAuthorizationService

let sut: RevokeAdminStatusToCourierUseCase

describe('Revoke admin status to courier tests', () => {
  beforeEach(() => {
    inMemoryCourierRepository = new InMemoryCourierRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new RevokeAdminStatusToCourierUseCase(
      inMemoryCourierRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can revoke admin status to courier', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courier = makeCourier({ isAdmin: true })
    await inMemoryCourierRepository.create(courier)
    const courierId = courier.id.toString()
    expect(inMemoryCourierRepository.items[0].isAdmin).toBe(true)
    expect(inMemoryCourierRepository.items[0].updatedAt).toBe(undefined)

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryCourierRepository.items[0].isAdmin).toBe(false)
    expect(inMemoryCourierRepository.items[0].updatedAt).toEqual(
      expect.any(Date),
    )
  })

  test('If cannot revoke admin status to courier if courierId is wrong', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courierId = '1'

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
  test('if user that does the action is not admin it cannot revoke admin status to courier', async () => {
    const adminId = 'Invalid admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)
    const courier = makeCourier({ isAdmin: true })
    await inMemoryCourierRepository.create(courier)
    const courierId = courier.id.toString()

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If an inactive admin cannot revoke admin status to courier', async () => {
    const adminId = 'Inactive admin'
    mockAuthorizationService.addInactiveAdminId(adminId)
    const courier = makeCourier({ isAdmin: true })
    await inMemoryCourierRepository.create(courier)
    const courierId = courier.id.toString()

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if throw error when creator is not an authorized user', async () => {
    const courier = makeCourier({ isAdmin: true })
    await inMemoryCourierRepository.create(courier)
    expect(inMemoryCourierRepository.items[0].isAdmin).toBe(true)
    const courierId = courier.id.toString()

    const adminId = 'unknown user'

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
