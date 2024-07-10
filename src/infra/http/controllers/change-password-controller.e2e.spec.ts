import { Encrypter } from '@/domain/delivery/application/cryptography/encrypter'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { CourierFactory } from 'test/factories/make-courier'

describe('password password tests (e2e)', () => {
  let app: INestApplication
  let adminFactory: AdminFactory
  let courierFactory: CourierFactory
  let encrypter: Encrypter

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, CourierFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    adminFactory = moduleRef.get(AdminFactory)
    courierFactory = moduleRef.get(CourierFactory)
    encrypter = moduleRef.get(Encrypter)

    await app.init()
  })

  test('[POST] /auth/password_reset - courier', async () => {
    const courier = await courierFactory.makePrismaCourier({
      email: 'courier@coirier.com',
    })

    const expiresIn = '1h'

    const payload = {
      sub: courier.id.toString(),
    }

    const token = await encrypter.encrypt(payload, expiresIn)

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
  })

  test('[POST] /auth/password_reset - admin', async () => {
    const admin = await adminFactory.makePrismaAdmin({
      email: 'admin@admin.com',
    })
    const expiresIn = '1h'

    const payload = {
      sub: admin.id.toString(),
    }

    const token = await encrypter.encrypt(payload, expiresIn)

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
  })
})
