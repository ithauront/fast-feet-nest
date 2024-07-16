import { InMemoryCourierRepository } from '../../../../../test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { ChangePasswordUseCase } from './change-password'
import { InMemoryAdminRepository } from '../../../../../test/repositories/in-memory-admin-repository'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeAdmin } from 'test/factories/make-admin'
import { TokenExpiredError } from './errors/token-expired-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let inMemoryCourierRepository: InMemoryCourierRepository
let inMemoryAdminRepository: InMemoryAdminRepository
let fakeEncrypter: FakeEncrypter
let fakeHasher: FakeHasher

let sut: ChangePasswordUseCase

describe('Change courier phone tests', () => {
  beforeEach(() => {
    inMemoryCourierRepository = new InMemoryCourierRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    fakeEncrypter = new FakeEncrypter()
    fakeHasher = new FakeHasher()

    sut = new ChangePasswordUseCase(
      inMemoryCourierRepository,
      inMemoryAdminRepository,
      fakeEncrypter,
      fakeHasher,
    )
  })

  test('If can change password for courier user', async () => {
    // I find this test very limited because of the use of the fakers and the security concerns that keep us from having access of the password stored. We end up testing if a fake password is diferent than another fake password but not going realy deep in what the SUT does, the only real conection with the SUT is if we touch the set password therefor updating the updateAt prop. But with a console.log() we can inspect the repository and see that the password have changed. with that being said, I made an integration test that uses the real flow and token generated to change password
    const courier = makeCourier({ password: 'oldPassword' })
    await inMemoryCourierRepository.create(courier)
    expect(inMemoryCourierRepository.items[0].updatedAt).toBe(undefined)

    const courierId = courier.id.toString()

    const simulatedPayload = {
      sub: courierId,
      exp: Math.floor(Date.now() / 1000) + 3600,
    }

    const uniqueAccessToken = await fakeEncrypter.encrypt(simulatedPayload)

    const newPassword = 'newPassword'
    const originalPasswordHash = await fakeHasher.hash('oldPassword')

    const result = await sut.execute({
      uniqueAccessToken,
      newPassword,
    })

    if (result.isRight()) {
      const updatedPasswordHash = await fakeHasher.hash(newPassword)
      expect(updatedPasswordHash).not.toEqual(originalPasswordHash)
      expect(inMemoryCourierRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
    }
  })
  test('If can change password for admin user', async () => {
    const admin = makeAdmin({ password: 'oldPassword' })
    await inMemoryAdminRepository.create(admin)
    expect(inMemoryAdminRepository.items[0].updatedAt).toBe(undefined)

    const adminId = admin.id.toString()

    const simulatedPayload = {
      sub: adminId,
      exp: Math.floor(Date.now() / 1000) + 3600,
    }

    const uniqueAccessToken = await fakeEncrypter.encrypt(simulatedPayload)

    const newPassword = 'newPassword'
    const originalPasswordHash = await fakeHasher.hash('oldPassword')

    const result = await sut.execute({
      uniqueAccessToken,
      newPassword,
    })
    if (result.isRight()) {
      const updatedPasswordHash = await fakeHasher.hash(newPassword)
      expect(updatedPasswordHash).not.toEqual(originalPasswordHash)
      expect(inMemoryAdminRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
    }
  })
  test('If the accesstoken is expired throw a token expired error', async () => {
    const admin = makeAdmin({ password: 'oldPassword' })
    await inMemoryAdminRepository.create(admin)
    expect(inMemoryAdminRepository.items[0].updatedAt).toBe(undefined)

    const adminId = admin.id.toString()

    const simulatedPayload = {
      sub: adminId,
      exp: 789652800, // 01/01/1995
    }

    const expiredAccessToken = await fakeEncrypter.encrypt(simulatedPayload)

    const newPassword = 'newPassword'

    const result = await sut.execute({
      uniqueAccessToken: expiredAccessToken,
      newPassword,
    })
    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(TokenExpiredError)
  })
  test('If the token cannot be decrypted throw an invalid credential error', async () => {
    const invalidToken = 'thisIsNotAValidToken'
    const newPassword = 'newPassword'

    const result = await sut.execute({
      uniqueAccessToken: invalidToken,
      newPassword,
    })
    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
  test('If the accesstoken is expired throw a token expired error', async () => {
    const invalidUserId = 'non existent user Id'

    const simulatedPayload = {
      sub: invalidUserId,
      exp: Math.floor(Date.now() / 1000) + 3600,
    }

    const invalidAccessToken = await fakeEncrypter.encrypt(simulatedPayload)

    const newPassword = 'newPassword'

    const result = await sut.execute({
      uniqueAccessToken: invalidAccessToken,
      newPassword,
    })
    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
