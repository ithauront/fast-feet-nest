import { InMemoryCourierRepository } from 'test/repositories/in-memory-courier-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { RegisterCourierUseCase } from './register-courier'
import { makeCourier } from 'test/factories/make-courier'
import { CourierStatus } from '../../../enterprise/entities/courier'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'

let inMemoryCourierRepository: InMemoryCourierRepository
let mockAuthorizationService: MockAuthorizationService
let fakeHasher: FakeHasher
let sut: RegisterCourierUseCase

describe('Create courier tests', () => {
  beforeEach(() => {
    inMemoryCourierRepository = new InMemoryCourierRepository()
    mockAuthorizationService = new MockAuthorizationService()
    fakeHasher = new FakeHasher()
    sut = new RegisterCourierUseCase(
      inMemoryCourierRepository,
      fakeHasher,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  const cpf = fakeCPFGenerator()
  test('If can register a default courier', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      cpf,
      email: 'courier@courier.com',
      name: 'John Doe',
      password: '123456',
      phone: '2345678',
    })
    if (result.isRight()) {
      const courier = result.value
      expect(courier.email).toEqual('courier@courier.com')
      expect(courier.isAdmin).toBe(false)
      expect(courier.status).toEqual('ACTIVE')
      expect(courier.location).toBe(null)
    }
  })

  test('If cannot create a courier if email already used', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const courier = makeCourier()
    await inMemoryCourierRepository.create(courier)

    const result = await sut.execute({
      creatorId: adminId,
      cpf,
      email: courier.email,
      name: 'John Doe',
      password: '123456',
      phone: '2345678',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
  test('if user is not admin it cannot create courier', async () => {
    const adminId = 'Invalid admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      cpf,
      email: 'courier@courier.com',
      name: 'John Doe',
      password: '123456',
      phone: '2345678',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })

  test('if throw error when creator is not an authorized user', async () => {
    const adminId = 'unknown user'

    const result = await sut.execute({
      creatorId: adminId,
      cpf,
      email: 'courier@courier.com',
      name: 'John Doe',
      password: '123456',
      phone: '2345678',
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
  test('if can create a courier with diferent props than default settings', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      cpf,
      email: 'courier@courier.com',
      name: 'John Doe',
      password: '123456',
      phone: '2345678',
      isAdmin: true,
      status: CourierStatus.ON_VACATION,
      location: { latitude: 48.86726696440399, longitude: 2.3338573695049196 },
    })

    if (result.isRight()) {
      const courier = result.value
      expect(inMemoryCourierRepository.items[0].email).toEqual(
        'courier@courier.com',
      )
      expect(courier.isAdmin).toBe(true)
      expect(courier.status).toEqual('ON_VACATION')
      expect(courier.location).toEqual(
        expect.objectContaining({
          latitude: 48.86726696440399,
          longitude: 2.3338573695049196,
        }),
      )
    }
  })
})
