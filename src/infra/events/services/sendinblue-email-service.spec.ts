import { Test, TestingModule } from '@nestjs/testing'
import { SendInBlueEmailService } from './sendinblue-email-service'
import { AppModule } from '../../app.module'
import { EnvModule } from '../../env/env.module'

describe('SendInBlueEmailService', () => {
  let service: SendInBlueEmailService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, EnvModule],
      providers: [SendInBlueEmailService],
    }).compile()

    service = module.get<SendInBlueEmailService>(SendInBlueEmailService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should send an email', async () => {
    const response = await service.sendEmail(
      'iurithauront@gmail.com',
      'Test',
      'This is a test',
    )
    expect(response).toBeUndefined()
  })
})
