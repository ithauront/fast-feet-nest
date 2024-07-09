import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { CourierFactory } from 'test/factories/make-courier'
import { PackageItemFactory } from 'test/factories/make-package-item'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Alter package item status tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let courierFactory: CourierFactory
  let recipientFactory: RecipientFactory
  let packageItemFactory: PackageItemFactory
  let attachmentFactory: AttachmentFactory

  let token: string
  let packageItemId: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        CourierFactory,
        RecipientFactory,
        PackageItemFactory,
        AttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    courierFactory = moduleRef.get(CourierFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    packageItemFactory = moduleRef.get(PackageItemFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)

    await app.init()

    const courier = await courierFactory.makePrismaCourier({
      isAdmin: true,
    }) // using courier admin because only courier  of package can mark package as delivered

    token = jwt.sign({ sub: courier.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient()

    const packageItem = await packageItemFactory.makePrismaPackageItem({
      recipientId: recipient.id,
      courierId: courier.id,
    })

    packageItemId = packageItem.id.toString()
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
  test('[put]/package_item/:packageItemId/status - Delivered', async () => {
    const attachment1 = await attachmentFactory.makePrismaAttachment({}, true)

    const response = await request(app.getHttpServer())
      .put(`/package_item/${packageItemId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'Delivered',
        attachmentIds: [attachment1.id.toString()],
      })

    expect(response.statusCode).toBe(200)
    const packageItemOnDatabase = await prisma.packageItem.findFirst({
      where: { id: packageItemId },
    })
    expect(packageItemOnDatabase?.status).toEqual('DELIVERED')
  })
})
