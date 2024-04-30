import { InMemoryCourierRepository } from '../../../../../test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { InMemoryAdminRepository } from '../../../../../test/repositories/in-memory-admin-repository'
import { AuthorizationService } from './authorization'
import { makeAdmin } from 'test/factories/make-admin'
import { UnauthorizedAdminError } from '../use-cases/errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../use-cases/errors/not-found-or-unauthorized-error'
import { CourierStatus } from '../../enterprise/entities/courier'

let inMemoryCourierRepository: InMemoryCourierRepository
let inMemoryAdminRepository: InMemoryAdminRepository

let sut: AuthorizationService

describe('Authorization Service tests', () => {
  beforeEach(() => {
    inMemoryCourierRepository = new InMemoryCourierRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()

    sut = new AuthorizationService(
      inMemoryCourierRepository,
      inMemoryAdminRepository,
    )
  })

  test('If can authorize a default admin', async () => {
    const admin = makeAdmin()
    const adminId = admin.id.toString()
    await inMemoryAdminRepository.create(admin)

    await expect(sut.authorize(adminId)).resolves.not.toThrow()
  })

  test('If cannot authorize a inactive admin', async () => {
    const admin = makeAdmin({ isActive: false })
    const adminId = admin.id.toString()
    await inMemoryAdminRepository.create(admin)

    const result = await sut.authorize(adminId)

    expect(result?.isLeft()).toBe(true)

    expect(result?.value).toBeInstanceOf(UnauthorizedAdminError)
  })

  test('if courier with admin privileges is authorized', async () => {
    const courier = makeCourier({ isAdmin: true })
    const courierId = courier.id.toString()
    await inMemoryCourierRepository.create(courier)

    await expect(sut.authorize(courierId)).resolves.not.toThrow()
  })
  test('If cannot authorize if the courier is not an admin ', async () => {
    const courier = makeCourier() // courier is not admin by default on the factory
    const courierId = courier.id.toString()
    await inMemoryCourierRepository.create(courier)

    const result = await sut.authorize(courierId)

    expect(result?.isLeft()).toBe(true)

    expect(result?.value).toBeInstanceOf(UnauthorizedAdminError)
  })

  test('If cannot authorize if the courier status is dismissed', async () => {
    const courier = makeCourier({ status: CourierStatus.DISMISSED })
    const courierId = courier.id.toString()
    await inMemoryCourierRepository.create(courier)

    const result = await sut.authorize(courierId)

    expect(result?.isLeft()).toBe(true)

    expect(result?.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If cannot authorize if the courier status is inactive', async () => {
    const courier = makeCourier({ status: CourierStatus.INACTIVE })
    const courierId = courier.id.toString()
    await inMemoryCourierRepository.create(courier)

    const result = await sut.authorize(courierId)

    expect(result?.isLeft()).toBe(true)

    expect(result?.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If authorize if the courier status is on vacation', async () => {
    const courier = makeCourier({
      isAdmin: true,
      status: CourierStatus.ON_VACATION,
    })
    const courierId = courier.id.toString()
    await inMemoryCourierRepository.create(courier)
    expect(inMemoryCourierRepository.items[0].status).toEqual(
      CourierStatus.ON_VACATION,
    )

    await expect(sut.authorize(courierId)).resolves.not.toThrow()
  })
  test('If cannot authorize an user that is not admin or courier admin', async () => {
    const userId = '1'

    const result = await sut.authorize(userId)

    expect(result?.isLeft()).toBe(true)

    expect(result?.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
