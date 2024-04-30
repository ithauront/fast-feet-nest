import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { SetCourierLocationUseCase } from './set-courier-location'
import { MockGeoLocationProvider } from 'test/mock/mock-geo-location-provider'
import { UserNotFoundError } from '../errors/user-not-found-error'

let inMemoryCourierRepository: InMemoryCourierRepository
let mockGeoLocationProvider: MockGeoLocationProvider

let sut: SetCourierLocationUseCase

describe('set courier location tests', () => {
  beforeEach(() => {
    inMemoryCourierRepository = new InMemoryCourierRepository()
    mockGeoLocationProvider = new MockGeoLocationProvider()

    sut = new SetCourierLocationUseCase(
      inMemoryCourierRepository,
      mockGeoLocationProvider,
    )
    mockGeoLocationProvider.clear()
  })

  test('If can set a courier location', async () => {
    const ip = '1'
    mockGeoLocationProvider.setMockResponse(
      ip,
      48.86726696440399,
      2.3338573695049196,
    )

    const courier = makeCourier()
    await inMemoryCourierRepository.create(courier)
    const courierId = courier.id.toString()
    expect(inMemoryCourierRepository.items[0].location).toBe(null)

    const result = await sut.execute({
      creatorId: courierId,
      ip,
    })
    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(inMemoryCourierRepository.items[0].location).toEqual({
        latitude: 48.86726696440399,
        longitude: 2.3338573695049196,
      })
    }
  })

  test('If set location if courierId is wrong', async () => {
    const ip = '1'
    mockGeoLocationProvider.setMockResponse(
      ip,
      48.86726696440399,
      2.3338573695049196,
    )

    const courier = makeCourier()
    await inMemoryCourierRepository.create(courier)
    const wrongCourierId = 'wrong courier id'
    expect(inMemoryCourierRepository.items[0].location).toBe(null)

    const result = await sut.execute({
      creatorId: wrongCourierId,
      ip,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
})
