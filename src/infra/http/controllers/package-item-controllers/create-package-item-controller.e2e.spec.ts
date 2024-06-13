import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'

describe('Create package item tests (e2e)', () => {
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

  test('[POST]/package_item', async () => {
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

    const recipient = await prisma.recipient.create({
      data: {
        name: 'John Doe',
        adress: '21 package street 987654',
        email: 'john@doe.com',
      },
    })
    const response = await request(app.getHttpServer())
      .post('/package_item')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'package 1',
        deliveryAddress: '21 package street 987654',
        recipientId: recipient.id,
      })

    expect(response.statusCode).toBe(201)

    const packageItemOnDatabase = await prisma.packageItem.findFirst({
      where: { title: 'package 1' },
    })

    expect(packageItemOnDatabase).toBeTruthy()
  })
})
