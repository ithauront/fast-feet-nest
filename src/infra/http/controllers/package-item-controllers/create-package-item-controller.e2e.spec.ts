import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Create package item tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let adminFactory: AdminFactory
  let recipientFactory: RecipientFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    adminFactory = moduleRef.get(AdminFactory)
    recipientFactory = moduleRef.get(RecipientFactory)

    await app.init()
  })

  test('[POST]/package_item', async () => {
    const admin = await adminFactory.makePrismaAdmin()

    const token = jwt.sign({ sub: admin.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient()

    const response = await request(app.getHttpServer())
      .post('/package_item')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'package 1',
        deliveryAddress: '21 package street 987654',
        recipientId: recipient.id.toString(),
      })

    expect(response.statusCode).toBe(201)

    const packageItemOnDatabase = await prisma.packageItem.findFirst({
      where: { title: 'package 1' },
    })

    expect(packageItemOnDatabase).toBeTruthy()
  })
})
