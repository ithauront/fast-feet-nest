import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { MarkCourierAsActiveUseCase } from './mark-courier-as-active'
import { CourierStatus } from '../../../enterprise/entities/courier'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'

let inMemoryCourierRepository: InMemoryCourierRepository
let mockAuthorizationService: MockAuthorizationService

let sut: MarkCourierAsActiveUseCase

describe('Mark courier as active tests', () => {
  beforeEach(() => {
    inMemoryCourierRepository = new InMemoryCourierRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new MarkCourierAsActiveUseCase(
      inMemoryCourierRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can mark a courier as active', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courier = makeCourier({
      status: CourierStatus.INACTIVE,
    })
    await inMemoryCourierRepository.create(courier)
    const courierId = courier.id.toString()
    expect(inMemoryCourierRepository.items[0].status).toEqual('INACTIVE')

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
    })
    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(inMemoryCourierRepository.items[0].status).toEqual('ACTIVE')
    }
  })

  test('If cannot mark as active if courierId is wrong', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courierId = '1'

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
  test('if user is not admin it cannot mark as active', async () => {
    const adminId = 'Not Admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)
    const courier = makeCourier({
      status: CourierStatus.INACTIVE,
    })
    await inMemoryCourierRepository.create(courier)
    expect(inMemoryCourierRepository.items[0].status).toEqual('INACTIVE')
    const courierId = courier.id.toString()

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If inactive admin cannot mark courier as inactive', async () => {
    const adminId = 'inactive Admin'
    mockAuthorizationService.addInactiveAdminId(adminId)
    const courier = makeCourier({
      status: CourierStatus.INACTIVE,
    })
    await inMemoryCourierRepository.create(courier)
    expect(inMemoryCourierRepository.items[0].status).toEqual('INACTIVE')
    const courierId = courier.id.toString()

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if throw error when creator is not an authorized user', async () => {
    const courier = makeCourier({
      status: CourierStatus.INACTIVE,
    })
    await inMemoryCourierRepository.create(courier)
    expect(inMemoryCourierRepository.items[0].status).toEqual('INACTIVE')
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
