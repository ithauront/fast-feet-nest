import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { CourierFactory } from 'test/factories/make-courier'

describe('list all courier tests (e2e)', () => {
  let app: INestApplication

  let jwt: JwtService
  let adminFactory: AdminFactory
  let courierFactory: CourierFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CourierFactory, AdminFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    courierFactory = moduleRef.get(CourierFactory)
    adminFactory = moduleRef.get(AdminFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[put]/user/courier', async () => {
    const creator = await adminFactory.makePrismaAdmin()

    const token = jwt.sign({ sub: creator.id.toString() })

    const courier = await courierFactory.makePrismaCourier()
    const courierId = courier.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/user/courier/${courierId}/phone`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        phone: '012323546',
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.courier).toEqual(
      expect.objectContaining({ phone: '012323546' }),
    )
  })
})
