import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { CourierFactory } from 'test/factories/make-courier'
import { waitFor } from 'test/utils/wait-for'
import { PrismaService } from '../database/prisma/prisma.service'

describe('Request password change tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let adminFactory: AdminFactory
  let courierFactory: CourierFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, CourierFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    adminFactory = moduleRef.get(AdminFactory)
    courierFactory = moduleRef.get(CourierFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('if email sent on request password change', async () => {
    await courierFactory.makePrismaCourier({
      email: 'courier@coirier.com',
    })

    const response = await request(app.getHttpServer())
      .post('/auth/request_password_reset')
      .send({
        userEmail: 'courier@coirier.com',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'Password change email has been sent successfully',
    })
    await waitFor(async () => {
      const emailOnDatabase = await prisma.email.findFirst({
        where: { recipientEmail: 'courier@coirier.com' },
      })
      expect(emailOnDatabase).not.toBe(null)
    })
  })

  test('[POST] auth/request_password_reset - admin', async () => {
    await adminFactory.makePrismaAdmin({
      email: 'admin@admin.com',
    })

    const response = await request(app.getHttpServer())
      .post('/auth/request_password_reset')
      .send({
        userEmail: 'admin@admin.com',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      message: 'Password change email has been sent successfully',
    })
    await waitFor(async () => {
      const emailOnDatabase = await prisma.email.findFirst({
        where: { recipientEmail: 'admin@admin.com' },
      })
      expect(emailOnDatabase).not.toBe(null)
    })
  })
})
