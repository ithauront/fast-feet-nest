import { InMemoryCourierRepository } from '../../../../../test/repositories/in-memory-courier-repository'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeCourier } from 'test/factories/make-courier'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { InMemoryAdminRepository } from '../../../../../test/repositories/in-memory-admin-repository'
import { AutenticateUseCase } from './autenticate'
import { makeAdmin } from 'test/factories/make-admin'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'
import { InvalidActionError } from './errors/invalid-action-error'
import { CourierStatus } from '../../enterprise/entities/courier'

let inMemoryCourierRepository: InMemoryCourierRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let inMemoryAdminRepository: InMemoryAdminRepository
let sut: AutenticateUseCase

describe('Autenticate tests', () => {
  beforeEach(() => {
    inMemoryCourierRepository = new InMemoryCourierRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    sut = new AutenticateUseCase(
      inMemoryCourierRepository,
      fakeHasher,
      fakeEncrypter,
      inMemoryAdminRepository,
    )
  })
  const cpf = fakeCPFGenerator()
  test('If can autenticate a courier', async () => {
    const courier = makeCourier({
      cpf,
      password: await fakeHasher.hash('123456'),
    })
    await inMemoryCourierRepository.create(courier)

    const result = await sut.execute({
      cpf,
      password: '123456',
    })
    if (result.isRight()) {
      const accessToken = result.value
      expect(accessToken).toEqual({ accessToken: expect.any(String) })
    }
  })
  test('If can autenticate a admin', async () => {
    const admin = makeAdmin({
      cpf,
      password: await fakeHasher.hash('123456'),
    })
    await inMemoryAdminRepository.create(admin)

    const result = await sut.execute({
      cpf,
      password: '123456',
    })
    if (result.isRight()) {
      const accessToken = result.value
      expect(accessToken).toEqual({ accessToken: expect.any(String) })
    }
  })
  test('If cannot autenticate a invalid user', async () => {
    const result = await sut.execute({
      cpf,
      password: '123456',
    })
    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
  test('If cannot autenticate admin with wrong password', async () => {
    const admin = makeAdmin({
      cpf,
      password: await fakeHasher.hash('123456'),
    })
    await inMemoryAdminRepository.create(admin)
    const result = await sut.execute({
      cpf,
      password: 'wrong password',
    })
    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
  test('If cannot autenticate courier with wrong password', async () => {
    // even if the logic for wrong password is the same for courier or admin I did both test just to be more representative of my useCase

    const courier = makeCourier({
      cpf,
      password: await fakeHasher.hash('123456'),
    })
    await inMemoryCourierRepository.create(courier)
    const result = await sut.execute({
      cpf,
      password: 'wrong password',
    })
    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
  test('If can autenticate an inactive courier', async () => {
    const courier = makeCourier({
      cpf,
      password: await fakeHasher.hash('123456'),
      status: CourierStatus.INACTIVE,
    })
    await inMemoryCourierRepository.create(courier)

    const result = await sut.execute({
      cpf,
      password: '123456',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidActionError)
    if (result.value instanceof InvalidActionError) {
      expect(result.value.message).toEqual('User is not active')
    }
  })
  test('If can autenticate an dismissed courier', async () => {
    const courier = makeCourier({
      cpf,
      password: await fakeHasher.hash('123456'),
      status: CourierStatus.DISMISSED,
    })
    await inMemoryCourierRepository.create(courier)

    const result = await sut.execute({
      cpf,
      password: '123456',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidActionError)
    if (result.value instanceof InvalidActionError) {
      expect(result.value.message).toEqual('User is not active')
    }
  })
  test('If can autenticate an on vacation courier', async () => {
    const courier = makeCourier({
      cpf,
      password: await fakeHasher.hash('123456'),
      status: CourierStatus.ON_VACATION,
    })
    await inMemoryCourierRepository.create(courier)

    const result = await sut.execute({
      cpf,
      password: '123456',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidActionError)
    if (result.value instanceof InvalidActionError) {
      expect(result.value.message).toEqual('User is not active')
    }
  })

  test('If cannot autenticate inactive admin', async () => {
    const admin = makeAdmin({
      cpf,
      password: await fakeHasher.hash('123456'),
      isActive: false,
    })
    await inMemoryAdminRepository.create(admin)
    const result = await sut.execute({
      cpf,
      password: '123456',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidActionError)
    if (result.value instanceof InvalidActionError) {
      expect(result.value.message).toEqual('User is not active')
    }
  })
})
