import { RequestPasswordChangeUseCase } from '@/domain/delivery/application/use-cases/request-password-change'
import { OnRequestPasswordChange } from '@/domain/notification/application/subscribers/on-request-password-change'
import { SendEmailUseCase } from '@/domain/notification/application/use-cases/send-email'
import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { makeCourier } from 'test/factories/make-courier'
import { MockEmailService } from 'test/mock/mock-email-service'
import { InMemoryAdminRepository } from '../repositories/in-memory-admin-repository'
import { InMemoryCourierRepository } from '../repositories/in-memory-courier-repository'
import { InMemoryEmailRepository } from '../repositories/in-memory-email-repostory'
import { waitFor } from 'test/utils/wait-for'

import { MockInstance, vi } from 'vitest'

describe('integration tests for the request password change flow from use case to email sent', () => {
  let sendEmailUseCase: SendEmailUseCase
  let mockEmailService: MockEmailService
  let requestPasswordChangeUseCase: RequestPasswordChangeUseCase
  let inMemoryEmailRepository: InMemoryEmailRepository
  let inMemoryCourierRepository: InMemoryCourierRepository
  let inMemoryAdminRepository: InMemoryAdminRepository
  let fakeEncrypter: FakeEncrypter
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
    inMemoryCourierRepository = new InMemoryCourierRepository()
    inMemoryAdminRepository = new InMemoryAdminRepository()
    fakeEncrypter = new FakeEncrypter()
    requestPasswordChangeUseCase = new RequestPasswordChangeUseCase(
      inMemoryCourierRepository,
      inMemoryAdminRepository,
      fakeEncrypter,
    )

    vi.clearAllMocks()
  })

  test('complete flow from requestPasswordChangeUseCase to Email sent', async () => {
    const user = makeCourier({ email: 'user@email.com' })
    const userEmail = 'user@email.com'
    await inMemoryCourierRepository.create(user)

    await requestPasswordChangeUseCase.execute({
      userEmail,
    })
    await waitFor(() => expect(sendEmailExecuteMock).toHaveBeenCalled())
    expect(sendEmailExecuteMock).toHaveBeenCalledWith({
      recipientEmail: userEmail,
      subject: 'You requested a password change',
      body: expect.stringContaining(
        'https://fast-feet/frontend/password_reset?token=',
      ),
    })
    expect(inMemoryEmailRepository.items[0].subject).toEqual(
      'You requested a password change',
    )
  })
})
