import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'

describe('Register courier tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST]/users/courier', async () => {
    const cpf = fakeCPFGenerator()
    const admin = await prisma.admin.create({
      data: {
        name: 'Jhon Doe',
        cpf,
        email: 'jhon@admin.com',
        password: '123456',
      },
    })

    const token = jwt.sign({ sub: admin.id })

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

    if (response.statusCode !== 201) {
      console.log(JSON.stringify(response.body, null, 2))
    }
    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.courier.findUnique({
      where: { email: 'jack@doe.com' },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
