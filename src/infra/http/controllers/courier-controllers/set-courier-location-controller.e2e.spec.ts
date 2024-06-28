import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CourierFactory } from 'test/factories/make-courier'

describe('Set courier location tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let courierFactory: CourierFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CourierFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    courierFactory = moduleRef.get(CourierFactory)

    await app.init()
  })

  test('[Put]/users/courier/location', async () => {
    const courier = await courierFactory.makePrismaCourier()
    const token = jwt.sign({ sub: courier.id.toString() })
    const iptoTestEngland = '212.58.244.23'

    const userCreated = await prisma.courier.findUnique({
      where: { email: courier.email },
    })
    expect(userCreated?.latitude).toBeNull()
    expect(userCreated?.longitude).toBeNull()

    const response = await request(app.getHttpServer())
      .put('/user/courier/location')
      .set('Authorization', `Bearer ${token}`)
      .set('x-forwarded-for', iptoTestEngland)

    expect(response.statusCode).toBe(200)
    const userUpdated = await prisma.courier.findUnique({
      where: { email: courier.email },
    })

    expect(userUpdated?.latitude).toBeCloseTo(51.5161, 2)
    expect(userUpdated?.longitude).toBeCloseTo(-0.0949, 2)
  })
})
