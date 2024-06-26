import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { CourierFactory } from 'test/factories/make-courier'

describe('Alter courier status tests (e2e)', () => {
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

  test('[put]//user/courier/:courierId/status - Inactive', async () => {
    const response = await request(app.getHttpServer())
      .put(`/user/courier/${courierId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'INACTIVE',
      })

    expect(response.statusCode).toBe(200)
    const courierOnDatabase = await prisma.courier.findFirst({
      where: { id: courierId },
    })
    expect(courierOnDatabase?.status).toEqual('INACTIVE')
  })

  test('[put]//user/courier/:courierId/status - Active', async () => {
    const response = await request(app.getHttpServer())
      .put(`/user/courier/${courierId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'ACTIVE',
      })

    expect(response.statusCode).toBe(200)
    const courierOnDatabase = await prisma.courier.findFirst({
      where: { id: courierId },
    })
    expect(courierOnDatabase?.status).toEqual('ACTIVE')
  })

  test('[put]//user/courier/:courierId/status - Dismissed', async () => {
    const response = await request(app.getHttpServer())
      .put(`/user/courier/${courierId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'DISMISSED',
      })

    expect(response.statusCode).toBe(200)
    const courierOnDatabase = await prisma.courier.findFirst({
      where: { id: courierId },
    })
    expect(courierOnDatabase?.status).toEqual('DISMISSED')
  })
  test('[put]//user/courier/:courierId/status - Vacation', async () => {
    const response = await request(app.getHttpServer())
      .put(`/user/courier/${courierId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'ON_VACATION',
      })

    expect(response.statusCode).toBe(200)
    const courierOnDatabase = await prisma.courier.findFirst({
      where: { id: courierId },
    })
    expect(courierOnDatabase?.status).toEqual('ON_VACATION')
  })
})
