import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { ChangeCourierPhoneUseCase } from './change-courier-phone'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'

let inMemoryCourierRepository: InMemoryCourierRepository
let mockAuthorizationService: MockAuthorizationService

let sut: ChangeCourierPhoneUseCase

describe('Change courier phone tests', () => {
  beforeEach(() => {
    inMemoryCourierRepository = new InMemoryCourierRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new ChangeCourierPhoneUseCase(
      inMemoryCourierRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can change courier phone', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courier = makeCourier()
    await inMemoryCourierRepository.create(courier)
    const courierId = courier.id.toString()
    expect(inMemoryCourierRepository.items[0].phone).toEqual(courier.phone)
    expect(inMemoryCourierRepository.items[0].updatedAt).toBe(undefined)

    const newPhone = '1234567'

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
      phone: newPhone,
    })
    if (result.isRight()) {
      expect(inMemoryCourierRepository.items[0].phone).toEqual(newPhone)
      expect(inMemoryCourierRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
    }
  })

  test('If cannot change courier phone if courierId is wrong', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courierId = '1'
    const newPhone = '1234567'

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
      phone: newPhone,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
  test('if user that does the action is not admin it cannot change courier phone', async () => {
    const adminId = 'not Admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)
    const courier = makeCourier()
    await inMemoryCourierRepository.create(courier)
    const courierId = courier.id.toString()
    const newPhone = '1234567'

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
      phone: newPhone,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If an inactive admin cannot change courier phone', async () => {
    const adminId = 'invalid Admin'
    mockAuthorizationService.addInactiveAdminId(adminId)
    const courier = makeCourier()
    await inMemoryCourierRepository.create(courier)
    const courierId = courier.id.toString()
    const newPhone = '1234567'

    const result = await sut.execute({
      creatorId: adminId,
      courierId,
      phone: newPhone,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if creator is not found or unauthorized, it should return NotFoundOrUnauthorizedError', async () => {
    const unknownAdminId = 'unknownAdminId'

    const courier = makeCourier()
    await inMemoryCourierRepository.create(courier)
    const courierId = courier.id.toString()
    const newPhone = '1234567'

    const result = await sut.execute({
      creatorId: unknownAdminId,
      courierId,
      phone: newPhone,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
