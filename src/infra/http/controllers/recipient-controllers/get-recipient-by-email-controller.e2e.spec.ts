import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('get recipient by email tests (e2e)', () => {
  let app: INestApplication

  let jwt: JwtService
  let adminFactory: AdminFactory
  let recipientFactory: RecipientFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory, AdminFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    recipientFactory = moduleRef.get(RecipientFactory)
    adminFactory = moduleRef.get(AdminFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/user/recipient/:recipientEmail', async () => {
    const creator = await adminFactory.makePrismaAdmin()

    const token = jwt.sign({ sub: creator.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient({
      email: 'recipient@recipient.com',
    })

    const response = await request(app.getHttpServer())
      .get(`/user/recipient/${recipient.email}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.Recipient).toEqual(
      expect.objectContaining({
        email: 'recipient@recipient.com',
      }),
    )
  })
})
