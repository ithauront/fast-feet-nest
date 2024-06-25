import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'

describe('Create admin tests (e2e)', () => {
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

  test('[POST]/users/admin', async () => {
    const admin = await adminFactory.makePrismaAdmin()

    const token = jwt.sign({ sub: admin.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/users/admin')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Jack Doe',
        email: 'jack@admin.com',
        cpf: fakeCPFGenerator(),
        password: '123456',
      })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.admin.findUnique({
      where: { email: 'jack@admin.com' },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
