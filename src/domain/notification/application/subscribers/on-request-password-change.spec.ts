import { MockInstance, vi } from 'vitest'
import { OnRequestPasswordChange } from './on-request-password-change'
import { RequestPasswordChangeEvent } from '@/domain/delivery/enterprise/events/request-password-change'
import { SendEmailUseCase } from '../use-cases/send-email'
import { MockEmailService } from 'test/mock/mock-email-service'
import { DomainEvents } from '@/core/events/domain-events'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryEmailRepository } from 'test/repositories/in-memory-email-repostory'

describe('OnRequestPasswordChange', () => {
  let sendEmailUseCase: SendEmailUseCase
  let inMemoryEmailRepository: InMemoryEmailRepository
  let mockEmailService: MockEmailService
  let sendEmailExecuteMock: MockInstance

  beforeEach(() => {
    inMemoryEmailRepository = new InMemoryEmailRepository()
    mockEmailService = new MockEmailService()
    sendEmailUseCase = new SendEmailUseCase(
      inMemoryEmailRepository,
      mockEmailService,
    )
    new OnRequestPasswordChange(sendEmailUseCase).setupSubscriptions()
    sendEmailExecuteMock = vi.spyOn(sendEmailUseCase, 'execute')
    vi.clearAllMocks()
  })

  test('should handle RequestPasswordChangeEvent and send an email', async () => {
    const userEmail = 'john@doe.com'
    const accessToken = 'test-token'

    const event = new RequestPasswordChangeEvent(
      new UniqueEntityId(),
      userEmail,
      accessToken,
    )

    DomainEvents.dispatch(event)

    await vi.waitFor(() => expect(sendEmailExecuteMock).toHaveBeenCalled())
    expect(sendEmailExecuteMock).toHaveBeenCalledWith({
      recipientEmail: userEmail,
      subject: 'You requested a password change',
      body: expect.stringContaining(
        `http://localhost:3000/reset-password?token=${accessToken}`,
      ),
    })

    expect(inMemoryEmailRepository.items[0].subject).toEqual(
      'You requested a password change',
    )
  })
})
