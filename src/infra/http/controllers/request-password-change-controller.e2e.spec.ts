import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { CourierFactory } from 'test/factories/make-courier'

describe('Request password change tests (e2e)', () => {
  let app: INestApplication
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

    await app.init()
  })

  test('[POST] auth/request_password_reset - courier', async () => {
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
  })
})
