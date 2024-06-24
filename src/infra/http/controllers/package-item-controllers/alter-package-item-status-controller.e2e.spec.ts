import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'

describe('Alter package item status tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  let token: string
  let packageItemId: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()

    const cpf = fakeCPFGenerator()
    const admin = await prisma.admin.create({
      data: {
        name: 'Jhon Doe',
        cpf,
        email: 'jhon@admin.com',
        password: '123456',
      },
    })

    token = jwt.sign({ sub: admin.id })

    const recipient = await prisma.recipient.create({
      data: {
        name: 'John Doe',
        adress: '21 package street 987654',
        email: 'john@doe.com',
      },
    })
    const packageItem = await prisma.packageItem.create({
      data: {
        title: 'package 1',
        deliveryAddress: '1 package street 987654',
        recipientId: recipient.id,
      },
    })

    packageItemId = packageItem.id
  })

  test('[put]/package_item/:packageItemId/status - In Transit', async () => {
    const response = await request(app.getHttpServer())
      .put(`/package_item/${packageItemId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'In Transit',
      })

    expect(response.statusCode).toBe(200)
    const packageItemOnDatabase = await prisma.packageItem.findFirst({
      where: { id: packageItemId },
    })
    expect(packageItemOnDatabase?.status).toEqual('IN_TRANSIT')
  })

  test('[put]/package_item/:packageItemId/status - Lost', async () => {
    const response = await request(app.getHttpServer())
      .put(`/package_item/${packageItemId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'Lost',
      })

    expect(response.statusCode).toBe(200)
    const packageItemOnDatabase = await prisma.packageItem.findFirst({
      where: { id: packageItemId },
    })
    expect(packageItemOnDatabase?.status).toEqual('LOST')
  })

  test('[put]/package_item/:packageItemId/status - Returned', async () => {
    const response = await request(app.getHttpServer())
      .put(`/package_item/${packageItemId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'Returned',
      })

    expect(response.statusCode).toBe(200)
    const packageItemOnDatabase = await prisma.packageItem.findFirst({
      where: { id: packageItemId },
    })
    expect(packageItemOnDatabase?.status).toEqual('RETURNED')
  })

  // still have to make test for delivered because of attachments
})
