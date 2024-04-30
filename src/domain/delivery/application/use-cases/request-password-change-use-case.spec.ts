import { InMemoryCourierRepository } from '../../../../../test/repositories/in-memory-courier-repository'
import { makeCourier } from 'test/factories/make-courier'
import { RequestPasswordChangeUseCase } from './request-password-change'
import { InMemoryAdminRepository } from '../../../../../test/repositories/in-memory-admin-repository'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeAdmin } from 'test/factories/make-admin'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { DomainEvents } from '@/core/events/domain-events'
import { RequestPasswordChangeEvent } from '../../enterprise/events/request-password-change'
import { MockInstance } from 'vitest'

let inMemoryCourierRepository: InMemoryCourierRepository
let inMemoryAdminRepository: InMemoryAdminRepository
let fakeEncrypter: FakeEncrypter
let dispatchSpy: MockInstance

let sut: RequestPasswordChangeUseCase

describe('Request password change tests', () => {
  beforeEach(() => {
    inMemoryCourierRepository = new InMemoryCourierRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    fakeEncrypter = new FakeEncrypter()

    sut = new RequestPasswordChangeUseCase(
      inMemoryCourierRepository,
      inMemoryAdminRepository,
      fakeEncrypter,
    )
    dispatchSpy = vi.spyOn(DomainEvents, 'dispatch')
  })
  afterEach(() => {
    dispatchSpy.mockClear()
  })

  test('If can request a password change for courier user', async () => {
    const courier = makeCourier({ password: 'oldPassword' })
    await inMemoryCourierRepository.create(courier)

    const courierId = courier.id.toString()

    const result = await sut.execute({
      creatorId: courierId,
      userEmail: courier.email,
    })

    if (result.isRight()) {
      expect(result.value.message).toEqual(
        'Password change email has been sent successfully',
      )
    }
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.any(RequestPasswordChangeEvent),
    )
  })
  test('If can request a password change for admin user', async () => {
    const admin = makeAdmin({ password: 'oldPassword' })
    await inMemoryAdminRepository.create(admin)

    const adminId = admin.id.toString()

    const result = await sut.execute({
      creatorId: adminId,
      userEmail: admin.email,
    })

    if (result.isRight()) {
      expect(result.value.message).toEqual(
        'Password change email has been sent successfully',
      )
    }
    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.any(RequestPasswordChangeEvent),
    )
  })
  test('If user is unknown should send invalid credential error', async () => {
    const creatorId = 'unknown user'
    const creatorEmail = 'john@doe.com'

    const result = await sut.execute({
      creatorId,
      userEmail: creatorEmail,
    })
    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
    expect(dispatchSpy).not.toHaveBeenCalled()
  })
  test('If email dont match the email of the id return invalid credential error', async () => {
    const admin = makeAdmin({ password: 'oldPassword' })
    await inMemoryAdminRepository.create(admin)

    const adminId = admin.id.toString()
    const wrongPassword = 'wrong password'

    const result = await sut.execute({
      creatorId: adminId,
      userEmail: wrongPassword,
    })

    expect(result.isLeft())
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
    expect(dispatchSpy).not.toHaveBeenCalled()
  })
})
