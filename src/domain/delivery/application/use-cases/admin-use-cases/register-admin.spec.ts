import { FakeHasher } from 'test/cryptography/fake-hasher'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { InMemoryAdminRepository } from 'test/repositories/in-memory-admin-repository'
import { RegisterAdminUseCase } from './register-admin'
import { makeAdmin } from 'test/factories/make-admin'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'

let inMemoryAdminRepository: InMemoryAdminRepository
let mockAuthorizationService: MockAuthorizationService
let fakeHasher: FakeHasher
let sut: RegisterAdminUseCase

describe('Create courier tests', () => {
  beforeEach(() => {
    inMemoryAdminRepository = new InMemoryAdminRepository()
    mockAuthorizationService = new MockAuthorizationService()
    fakeHasher = new FakeHasher()
    sut = new RegisterAdminUseCase(
      inMemoryAdminRepository,
      fakeHasher,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  const cpf = fakeCPFGenerator()
  test('If can register a default admin', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      cpf,
      email: 'admin@admin.com',
      name: 'John Doe',
      password: '123456',
    })
    if (result.isRight()) {
      const admin = result.value
      expect(admin.email).toEqual('admin@admin.com')
      expect(admin.isAdmin).toBe(true)
      expect(admin.isActive).toBe(true)
      expect(inMemoryAdminRepository.items[0].name).toEqual('John Doe')
    }
  })

  test('If cannot register admin if email already used', async () => {
    const existingAdmin = makeAdmin()
    const existingAdminId = existingAdmin.id.toString()
    mockAuthorizationService.addActiveAdminId(existingAdminId)

    await inMemoryAdminRepository.create(existingAdmin)

    const result = await sut.execute({
      creatorId: existingAdminId,
      cpf,
      email: existingAdmin.email,
      name: 'John Doe',
      password: '123456',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
  test('if user is not admin it cannot create another admin', async () => {
    const adminId = 'Invalid admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      cpf,
      email: 'admin@admin.com',
      name: 'John Doe',
      password: '123456',
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
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
  test('if can create a admin with diferent props than default settings', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      cpf,
      email: 'admin@admin.com',
      name: 'John Doe',
      password: '123456',
      isActive: false,
    })

    if (result.isRight()) {
      const admin = result.value
      expect(inMemoryAdminRepository.items[0].email).toEqual('admin@admin.com')
      expect(admin.isAdmin).toBe(true)
      expect(admin.isActive).toBe(false)
    }
  })
})
