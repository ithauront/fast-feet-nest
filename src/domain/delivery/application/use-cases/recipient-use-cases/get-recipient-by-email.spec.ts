import { InMemoryRecipientRepository } from '../../../../../../test/repositories/in-memory-recipient-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { GetRecipientEmailUseCase } from './get-recipient-by-email'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let mockAuthorizationService: MockAuthorizationService

let sut: GetRecipientEmailUseCase

describe('Get recipient email tests', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new GetRecipientEmailUseCase(
      inMemoryRecipientRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can get recipient using email', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
    })
    if (result.isRight()) {
      expect(inMemoryRecipientRepository.items[0].email).toEqual(recipientEmail)
      expect(inMemoryRecipientRepository.items[0].name).toEqual(recipient.name)
    }
  })

  test('If cannot get recipient email if recipientEmail is wrong', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const recipientEmail = 'wrongRecipient@email.com'

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
  test('if user that does the action is not admin it cannot get recipient email', async () => {
    const adminId = 'not Admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)
    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If an inactive admin cannot get recipient email', async () => {
    const adminId = 'invalid Admin'
    mockAuthorizationService.addInactiveAdminId(adminId)
    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if creator is not found or unauthorized, it should return NotFoundOrUnauthorizedError', async () => {
    const unknownAdminId = 'unknownAdminId'

    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email

    const result = await sut.execute({
      creatorId: unknownAdminId,
      recipientEmail,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
