import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { CourierFactory } from 'test/factories/make-courier'

describe('Autenticate tests (e2e)', () => {
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

  test('[POST]/sessions - courier', async () => {
    const courier = await courierFactory.makePrismaCourier({
      cpf: '21043245323',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      cpf: courier.cpf,
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({ access_token: expect.any(String) })
  })

  test('[POST]/sessions - admin', async () => {
    const admin = await adminFactory.makePrismaAdmin({
      cpf: '12343267543',
      password: await hash('123456', 8),
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      cpf: admin.cpf,
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({ access_token: expect.any(String) })
  })
})
