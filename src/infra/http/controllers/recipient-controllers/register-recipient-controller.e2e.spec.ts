import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'

describe('Register recipeitn tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let adminFactory: AdminFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    adminFactory = moduleRef.get(AdminFactory)

    await app.init()
  })

  test('[POST]/users/recipient', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = jwt.sign({ sub: admin.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/users/recipient')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jack Doe',
        email: 'jack@doe.com',
        address: '21 recipient street 424824',
      })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.recipient.findUnique({
      where: { email: 'jack@doe.com' },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
