import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'
import { InMemoryRecipientRepository } from '../../../../../../test/repositories/in-memory-recipient-repository'
import { RegisterRecipientUseCase } from './register-recipient'
import { makeRecipient } from 'test/factories/make-recipient'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let mockAuthorizationService: MockAuthorizationService
let sut: RegisterRecipientUseCase

describe('Create recipient tests', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new RegisterRecipientUseCase(
      inMemoryRecipientRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can register a recipient', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      email: 'recipient@recipient.com',
      name: 'John Doe',
      address: '32 recipient street 154167, recipient city, BR',
    })
    if (result.isRight()) {
      const recipient = result.value
      expect(recipient.email).toEqual('recipient@recipient.com')
      expect(recipient.name).toEqual('John Doe')
      expect(recipient.address).toEqual(
        '32 recipient street 154167, recipient city, BR',
      )
      expect(recipient.id.toString()).toEqual(expect.any(String))
    }
  })

  test('If email already used and have same address return the existing recipient and dont create new one', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const recipient = makeRecipient({
      email: 'recipient@recipient.com',
      address: '32 recipient street 154167, recipient city, BR',
      name: 'existing recipient', // I'm using diferent name as an easy way to verify that we return the existing one
    })
    await inMemoryRecipientRepository.create(recipient)

    const result = await sut.execute({
      creatorId: adminId,
      email: recipient.email,
      name: 'John Doe',
      address: recipient.address,
    })
    if (result.isRight()) {
      const recipient = result.value
      expect(recipient.email).toEqual('recipient@recipient.com')
      expect(recipient.name).toEqual('existing recipient')
      expect(recipient.address).toEqual(
        '32 recipient street 154167, recipient city, BR',
      )
    }
    expect(inMemoryRecipientRepository.items).toHaveLength(1)
  })
  test('If email already used but do not have same address return user already exists error', async () => {
    const adminId = 'Valid admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const recipient = makeRecipient({
      email: 'recipient@recipient.com',
      address: 'existing address',
      name: 'existing recipient', // I'm using diferent name as an easy way to verify that we return the existing one
    })
    await inMemoryRecipientRepository.create(recipient)

    const result = await sut.execute({
      creatorId: adminId,
      email: recipient.email,
      name: 'John Doe',
      address: '32 recipient street 154167, recipient city, BR',
    })

    if (result.isLeft()) {
      const error = result.value
      expect(error).toBeInstanceOf(UserAlreadyExistsError)
      expect(error.message).toEqual(
        'Recipient with the provided email exists but with a different address. Please verify the email and address provided.',
      )
    }
  })
  test('if user is not admin it cannot create recipient', async () => {
    const adminId = 'Invalid admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)

    const result = await sut.execute({
      creatorId: adminId,
      email: 'recipient@recipient.com',
      name: 'John Doe',
      address: '32 recipient street 154167, recipient city, BR',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })

  test('if throw error when creator is not an authorized user', async () => {
    const adminId = 'unknown user'

    const result = await sut.execute({
      creatorId: adminId,
      email: 'recipient@recipient.com',
      name: 'John Doe',
      address: '32 recipient street 154167, recipient city, BR',
    })
    expect(result.isLeft()).toBe(true)

    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
