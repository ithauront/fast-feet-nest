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

  test('[get]/user/courier', async () => {
    const creator = await adminFactory.makePrismaAdmin()

    const token = jwt.sign({ sub: creator.id.toString() })

    await courierFactory.makePrismaCourier({
      name: 'courier 1',
    })
    await courierFactory.makePrismaCourier({
      name: 'courier 2',
    })

    await courierFactory.makePrismaCourier({
      name: 'courier 3',
    })
    await courierFactory.makePrismaCourier({
      name: 'courier 4',
    })

    const response = await request(app.getHttpServer())
      .get('/user/courier')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        couriers: expect.arrayContaining([
          expect.objectContaining({ name: 'courier 1' }),
          expect.objectContaining({ name: 'courier 2' }),
          expect.objectContaining({ name: 'courier 3' }),
          expect.objectContaining({ name: 'courier 4' }),
        ]),
      }),
    )
  })
})
