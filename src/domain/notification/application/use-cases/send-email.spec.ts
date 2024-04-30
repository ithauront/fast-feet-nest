import { MockEmailService } from 'test/mock/mock-email-service'
import { SendEmailUseCase } from './send-email'
import { InMemoryEmailRepository } from '../../../../../test/repositories/in-memory-email-repostory'

let inMemoryEmailRepository: InMemoryEmailRepository
let mockEmailService: MockEmailService
let sut: SendEmailUseCase

describe('send email test', () => {
  beforeEach(() => {
    inMemoryEmailRepository = new InMemoryEmailRepository()
    mockEmailService = new MockEmailService()
    sut = new SendEmailUseCase(inMemoryEmailRepository, mockEmailService)
  })

  test('if can send an email', async () => {
    const email = {
      recipientEmail: 'john@doe.com',
      subject: 'new email',
      body: 'this is the new email',
    }

    const result = await sut.execute(email)
    if (result.isRight()) {
      expect(inMemoryEmailRepository.items[0].body).toEqual(
        'this is the new email',
      )
      expect(result.value.email).toEqual(
        expect.objectContaining({
          recipientEmail: 'john@doe.com',
          subject: 'new email',
          body: 'this is the new email',
        }),
      )
      expect(mockEmailService.lastEmail).toEqual({
        to: email.recipientEmail,
        subject: email.subject,
        body: email.body,
      })
    }
  })
})
