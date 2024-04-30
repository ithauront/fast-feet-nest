import { InMemoryRecipientRepository } from '../../../../../../test/repositories/in-memory-recipient-repository'
import { makeRecipient } from 'test/factories/make-recipient'
import { MockAuthorizationService } from 'test/mock/mock-authorization-service'
import { ListRecipientsUseCase } from './list-recipients'
import { UnauthorizedAdminError } from '../errors/unauthorized-admin-error'
import { NotFoundOrUnauthorizedError } from '../errors/not-found-or-unauthorized-error'

let inMemoryRecipientRepository: InMemoryRecipientRepository
let mockAuthorizationService: MockAuthorizationService

let sut: ListRecipientsUseCase

describe('list recipient tests', () => {
  beforeEach(() => {
    inMemoryRecipientRepository = new InMemoryRecipientRepository()
    mockAuthorizationService = new MockAuthorizationService()

    sut = new ListRecipientsUseCase(
      inMemoryRecipientRepository,
      mockAuthorizationService,
    )
    mockAuthorizationService.clear()
  })

  test('If can list recipient', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    const recipient1 = makeRecipient({ name: 'recipient1' })
    const recipient2 = makeRecipient({ name: 'recipient2' })
    const recipient3 = makeRecipient({ name: 'recipient3' })

    await inMemoryRecipientRepository.create(recipient1)
    await inMemoryRecipientRepository.create(recipient2)
    await inMemoryRecipientRepository.create(recipient3)

    const result = await sut.execute({
      creatorId: adminId,
      page: 1,
    })
    if (result.isRight()) {
      expect(result.value.recipients).toEqual([
        expect.objectContaining({ name: 'recipient1' }),
        expect.objectContaining({ name: 'recipient2' }),
        expect.objectContaining({ name: 'recipient3' }),
      ])
    }
  })

  test('If can list paginated recipients', async () => {
    const adminId = 'Valid Admin'
    mockAuthorizationService.addActiveAdminId(adminId)
    for (let i = 1; i <= 22; i++) {
      await inMemoryRecipientRepository.create(makeRecipient())
    }

    const result = await sut.execute({
      creatorId: adminId,
      page: 2,
    })

    if (result.isRight()) {
      expect(result.value.recipients).toHaveLength(2)
    }
  })
  test('if user that does the action is not admin it cannot get recipient list', async () => {
    const adminId = 'not Admin'
    mockAuthorizationService.addFailAuthorizationForId(adminId)
    const recipient1 = makeRecipient({ name: 'recipient1' })
    const recipient2 = makeRecipient({ name: 'recipient2' })
    const recipient3 = makeRecipient({ name: 'recipient3' })

    await inMemoryRecipientRepository.create(recipient1)
    await inMemoryRecipientRepository.create(recipient2)
    await inMemoryRecipientRepository.create(recipient3)

    const result = await sut.execute({
      creatorId: adminId,
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('If an inactive admin cannot get recipient list', async () => {
    const adminId = 'invalid Admin'
    mockAuthorizationService.addInactiveAdminId(adminId)
    const recipient1 = makeRecipient({ name: 'recipient1' })
    const recipient2 = makeRecipient({ name: 'recipient2' })
    const recipient3 = makeRecipient({ name: 'recipient3' })

    await inMemoryRecipientRepository.create(recipient1)
    await inMemoryRecipientRepository.create(recipient2)
    await inMemoryRecipientRepository.create(recipient3)

    const result = await sut.execute({
      creatorId: adminId,
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedAdminError)
  })
  test('if creator is not found or unauthorized, it should return NotFoundOrUnauthorizedError', async () => {
    const unknownAdminId = 'unknownAdminId'

    const recipient1 = makeRecipient({ name: 'recipient1' })
    const recipient2 = makeRecipient({ name: 'recipient2' })
    const recipient3 = makeRecipient({ name: 'recipient3' })

    await inMemoryRecipientRepository.create(recipient1)
    await inMemoryRecipientRepository.create(recipient2)
    await inMemoryRecipientRepository.create(recipient3)

    const result = await sut.execute({
      creatorId: unknownAdminId,
      page: 1,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundOrUnauthorizedError)
  })
})
