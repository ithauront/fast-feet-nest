import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('list all recipient tests (e2e)', () => {
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

  test('[get]/user/recipient', async () => {
    const creator = await adminFactory.makePrismaAdmin()

    const token = jwt.sign({ sub: creator.id.toString() })

    await recipientFactory.makePrismaRecipient({
      name: 'recipient 1',
    })
    await recipientFactory.makePrismaRecipient({
      name: 'recipient 2',
    })

    await recipientFactory.makePrismaRecipient({
      name: 'recipient 3',
    })
    await recipientFactory.makePrismaRecipient({
      name: 'recipient 4',
    })

    const response = await request(app.getHttpServer())
      .get('/user/recipient')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        recipients: expect.arrayContaining([
          expect.objectContaining({ name: 'recipient 1' }),
          expect.objectContaining({ name: 'recipient 2' }),
          expect.objectContaining({ name: 'recipient 3' }),
          expect.objectContaining({ name: 'recipient 4' }),
        ]),
      }),
    )
  })
})
