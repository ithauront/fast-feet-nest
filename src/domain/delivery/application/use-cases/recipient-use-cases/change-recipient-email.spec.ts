import { InMemoryRecipientRepository } from '../../../../../../test/repositories/in-memory-recipient-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { ChangeRecipientEmailUseCase } from './change-recipient-email'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let mockAuthorizationService: MockAuthorizationService

let sut: ChangeRecipientEmailUseCase

describe('Change recipient email tests', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new ChangeRecipientEmailUseCase(
      inMemoryRecipientRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can change recipient email', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email
    expect(inMemoryRecipientRepository.items[0].email).toEqual(recipient.email)
    expect(inMemoryRecipientRepository.items[0].updatedAt).toBe(undefined)

    const newEmail = 'recipient@recipient.com'

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
      newEmail,
    })
    if (result.isRight()) {
      expect(inMemoryRecipientRepository.items[0].email).toEqual(newEmail)
      expect(inMemoryRecipientRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
    }
  })

  test('If cannot change recipient email if recipientEmail is wrong', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const recipientEmail = 'wrongRecipient@email.com'
    const newEmail = 'recipient@recipient.com'

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
      newEmail,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
  test('if user that does the action is not admin it cannot change recipient email', async () => {
    const adminId = 'not Admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)
    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email
    const newEmail = 'recipient@recipient.com'

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
      newEmail,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If an inactive admin cannot change recipient email', async () => {
    const adminId = 'invalid Admin'
    mockAuthorizationService.addInactiveAdminId(adminId)
    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email
    const newEmail = 'recipient@recipient.com'

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
      newEmail,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if creator is not found or unauthorized, it should return NotFoundOrUnauthorizedError', async () => {
    const unknownAdminId = 'unknownAdminId'

    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email
    const newEmail = 'recipient@recipient.com'

    const result = await sut.execute({
      creatorId: unknownAdminId,
      recipientEmail,
      newEmail,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
