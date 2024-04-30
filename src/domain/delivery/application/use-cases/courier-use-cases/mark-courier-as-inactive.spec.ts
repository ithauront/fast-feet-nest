import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { MarkCourierAsInactiveUseCase } from './mark-courier-as-inactive'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'

let inMemoryCourierRepository: InMemoryCourierRepository
let mockAuthorizationService: MockAuthorizationService

let sut: MarkCourierAsInactiveUseCase

describe('Mark courier as inactive tests', () => {
  beforeEach(() => {
    inMemoryCourierRepository = new InMemoryCourierRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new MarkCourierAsInactiveUseCase(
      inMemoryCourierRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can mark a courier as inactive', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const courier = makeCourier()
    await inMemoryCourierRepository.create(courier)
    const courierId = courier.id.toString()

    expect(inMemoryCourierRepository.items[0].status).toEqual('ACTIVE')

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
    })

    if (result.isRight()) {
      expect(inMemoryCourierRepository.items[0].status).toEqual('INACTIVE')
      expect(inMemoryCourierRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
    }
  })

  test('If cannot mark as inactive if courierId is wrong', async () => {
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
  test('if user is not admin it cannot mark  courier as inactive', async () => {
    const adminId = 'Invalid admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)
    const courier = makeCourier()
    await inMemoryCourierRepository.create(courier)
    const courierId = courier.id.toString()

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If inactive admin cannot mark courier as inactive', async () => {
    const adminId = 'Invactive admin'
    mockAuthorizationService.addInactiveAdminId(adminId)
    const courier = makeCourier()
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
    const courier = makeCourier()
    await inMemoryCourierRepository.create(courier)
    expect(inMemoryCourierRepository.items[0].status).toEqual('ACTIVE')
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
