import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { ListCourierUseCase } from './list-courier'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'

let inMemoryCourierRepository: InMemoryCourierRepository
let mockAuthorizationService: MockAuthorizationService

let sut: ListCourierUseCase

describe('list courier tests', () => {
  beforeEach(() => {
    inMemoryCourierRepository = new InMemoryCourierRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new ListCourierUseCase(
      inMemoryCourierRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can list courier', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courier1 = makeCourier({ name: 'courier1' })
    const courier2 = makeCourier({ name: 'courier2' })
    const courier3 = makeCourier({ name: 'courier3' })

    await inMemoryCourierRepository.create(courier1)
    await inMemoryCourierRepository.create(courier2)
    await inMemoryCourierRepository.create(courier3)

    const result = await sut.execute({
      creatorId: adminId,
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value.courier).toEqual([
        expect.objectContaining({ name: 'courier1' }),
        expect.objectContaining({ name: 'courier2' }),
        expect.objectContaining({ name: 'courier3' }),
      ])
    }
  })

  test('If can list paginated couriers', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    for (let i = 1; i <= 22; i++) {
      await inMemoryCourierRepository.create(makeCourier())
    }

    const result = await sut.execute({
      creatorId: adminId,
      page: 2,
    })

    if (result.isRight()) {
      expect(result.value.courier).toHaveLength(2)
    }
  })
  test('if user that does the action is not admin it cannot get courier list', async () => {
    const adminId = 'not Admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)
    const courier1 = makeCourier({ name: 'courier1' })
    const courier2 = makeCourier({ name: 'courier2' })
    const courier3 = makeCourier({ name: 'courier3' })

    await inMemoryCourierRepository.create(courier1)
    await inMemoryCourierRepository.create(courier2)
    await inMemoryCourierRepository.create(courier3)

    const result = await sut.execute({
      creatorId: adminId,
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If an inactive admin cannot get courier list', async () => {
    const adminId = 'invalid Admin'
    mockAuthorizationService.addInactiveAdminId(adminId)
    const courier1 = makeCourier({ name: 'courier1' })
    const courier2 = makeCourier({ name: 'courier2' })
    const courier3 = makeCourier({ name: 'courier3' })

    await inMemoryCourierRepository.create(courier1)
    await inMemoryCourierRepository.create(courier2)
    await inMemoryCourierRepository.create(courier3)

    const result = await sut.execute({
      creatorId: adminId,
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if creator is not found or unauthorized, it should return NotFoundOrUnauthorizedError', async () => {
    const unknownAdminId = 'unknownAdminId'

    const courier1 = makeCourier({ name: 'courier1' })
    const courier2 = makeCourier({ name: 'courier2' })
    const courier3 = makeCourier({ name: 'courier3' })

    await inMemoryCourierRepository.create(courier1)
    await inMemoryCourierRepository.create(courier2)
    await inMemoryCourierRepository.create(courier3)

    const result = await sut.execute({
      creatorId: unknownAdminId,
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
