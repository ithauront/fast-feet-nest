import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'

describe('Register courier tests (e2e)', () => {
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

  test('[POST]/users/courier', async () => {
    const admin = await adminFactory.makePrismaAdmin()
    const token = jwt.sign({ sub: admin.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/users/courier')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jack Doe',
        cpf: fakeCPFGenerator(),
        email: 'jack@doe.com',
        password: '123456',
        phone: '2345678',
      })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.courier.findUnique({
      where: { email: 'jack@doe.com' },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
