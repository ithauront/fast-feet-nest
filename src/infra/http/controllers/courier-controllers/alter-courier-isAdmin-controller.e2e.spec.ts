import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { CourierFactory } from 'test/factories/make-courier'

describe('Alter courier isAdmin tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let adminFactory: AdminFactory
  let courierFactory: CourierFactory

  let token: string
  let courierId: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, CourierFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    adminFactory = moduleRef.get(AdminFactory)
    courierFactory = moduleRef.get(CourierFactory)

    await app.init()

    const admin = await adminFactory.makePrismaAdmin()

    token = jwt.sign({ sub: admin.id.toString() })

    const courier = await courierFactory.makePrismaCourier()

    courierId = courier.id.toString()
  })

  test('[put]//user/courier/:courierId/isAdmin - True', async () => {
    const response = await request(app.getHttpServer())
      .put(`/user/courier/${courierId}/isAdmin`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        isAdmin: true,
      })

    expect(response.statusCode).toBe(200)
    const courierOnDatabase = await prisma.courier.findFirst({
      where: { id: courierId },
    })
    expect(courierOnDatabase?.isAdmin).toEqual(true)
  })

  test('[put]//user/courier/:courierId/status - False', async () => {
    const response = await request(app.getHttpServer())
      .put(`/user/courier/${courierId}/isAdmin`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        isAdmin: false,
      })

    expect(response.statusCode).toBe(200)
    const courierOnDatabase = await prisma.courier.findFirst({
      where: { id: courierId },
    })
    expect(courierOnDatabase?.isAdmin).toEqual(false)
  })
})
