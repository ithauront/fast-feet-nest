import { DomainEvents } from '@/core/events/domain-events'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { CourierFactory } from 'test/factories/make-courier'
import { waitFor } from 'test/utils/wait-for'

describe('Request and change password change tests (integration)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let courierFactory: CourierFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, CourierFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    courierFactory = moduleRef.get(CourierFactory)

    await app.init()

    DomainEvents.shouldRun = true
  })

  test('request and change password integration', async () => {
    await courierFactory.makePrismaCourier({
      email: 'courier@coirier.com',
    })

    const response = await request(app.getHttpServer())
      .post('/auth/request_password_reset')
      .send({
        userEmail: 'courier@coirier.com',
      })

    expect(response.statusCode).toBe(200)
    await waitFor(async () => {
      const emailOnDatabase = await prisma.email.findFirst({
        where: { recipientEmail: 'courier@coirier.com' },
      })
      if (emailOnDatabase) {
        const tokenIndex = emailOnDatabase?.body.indexOf('token=') + 6
        const token = emailOnDatabase.body.slice(tokenIndex)

        const response = await request(app.getHttpServer())
          .post('/auth/password_reset')
          .set('Authorization', `Bearer ${token}`)
          .send({
            password: '123456',
          })

        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({
          message: 'Password changed successfully',
        })
      }
    })
  })
})
