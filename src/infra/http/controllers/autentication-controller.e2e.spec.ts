import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'

describe('Autenticate tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST]/sessions', async () => {
    const cpf = fakeCPFGenerator()
    const courier = await prisma.courier.create({
      data: {
        name: 'Jhon Doe',
        cpf,
        email: 'jhon@doe.com',
        password: await hash('123456', 8),
        phone: '2345678',
      },
    })

    const response = await request(app.getHttpServer()).post('/sessions').send({
      cpf: courier.cpf,
      password: '123456',
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({ access_token: expect.any(String) })
  })
})
