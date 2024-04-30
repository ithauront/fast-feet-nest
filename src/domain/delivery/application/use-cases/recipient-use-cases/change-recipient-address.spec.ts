import { InMemoryRecipientRepository } from '../../../../../../test/repositories/in-memory-recipient-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { ChangeRecipientAddressUseCase } from './change-recipient-address'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let mockAuthorizationService: MockAuthorizationService

let sut: ChangeRecipientAddressUseCase

describe('Change recipient address tests', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new ChangeRecipientAddressUseCase(
      inMemoryRecipientRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can change recipient address', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email
    expect(inMemoryRecipientRepository.items[0].address).toEqual(
      recipient.address,
    )
    expect(inMemoryRecipientRepository.items[0].updatedAt).toBe(undefined)

    const newAddress = '24 new address street 1342452 New Address City BR'

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
      address: newAddress,
    })
    if (result.isRight()) {
      expect(inMemoryRecipientRepository.items[0].address).toEqual(newAddress)
      expect(inMemoryRecipientRepository.items[0].updatedAt).toEqual(
        expect.any(Date),
      )
    }
  })

  test('If cannot change recipient address if recipientEmail is wrong', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const recipientEmail = 'WrongRecipient@email.com'
    const newAddress = '24 new address street 1342452 New Address City BR'

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
      address: newAddress,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserNotFoundError)
  })
  test('if user that does the action is not admin it cannot change recipient address', async () => {
    const adminId = 'not Admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)
    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email
    const newAddress = '24 new address street 1342452 New Address City BR'

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
      address: newAddress,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If an inactive admin cannot change recipient address', async () => {
    const adminId = 'invalid Admin'
    mockAuthorizationService.addInactiveAdminId(adminId)
    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email
    const newAddress = '24 new address street 1342452 New Address City BR'

    const result = await sut.execute({
      creatorId: adminId,
      recipientEmail,
      address: newAddress,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if creator is not found or unauthorized, it should return NotFoundOrUnauthorizedError', async () => {
    const unknownAdminId = 'unknownAdminId'

    const recipient = makeRecipient()
    await inMemoryRecipientRepository.create(recipient)
    const recipientEmail = recipient.email
    const newAddress = '24 new address street 1342452 New Address City BR'

    const result = await sut.execute({
      creatorId: unknownAdminId,
      recipientEmail,
      address: newAddress,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
