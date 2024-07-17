import { DomainEvents } from '@/core/events/domain-events'
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
import { waitFor } from 'test/utils/wait-for'

describe('On status change tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let courierFactory: CourierFactory
  let packageItemFactory: PackageItemFactory
  let recipientFactory: RecipientFactory
  let jwt: JwtService
  let attachmentFactory: AttachmentFactory

  let token: string
  let packageItemId: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        CourierFactory,
        PackageItemFactory,
        RecipientFactory,
        AttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    packageItemFactory = moduleRef.get(PackageItemFactory)
    courierFactory = moduleRef.get(CourierFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
    DomainEvents.shouldRun = true

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

  test('if send email on marked as in transit', async () => {
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

    await waitFor(async () => {
      const emailOnDatabase = await prisma.email.findFirst()
      expect(emailOnDatabase).not.toBe(null)
    })
  })
  test('if send email on marked as Lost', async () => {
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
    await waitFor(async () => {
      const emailOnDatabase = await prisma.email.findFirst()
      expect(emailOnDatabase).not.toBe(null)
    })
  })

  test('if send email on marked as Returned', async () => {
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
    await waitFor(async () => {
      const emailOnDatabase = await prisma.email.findFirst()
      expect(emailOnDatabase).not.toBe(null)
    })
  })
  test('if send email on marked as Delivered', async () => {
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
    const attachmentOnDatabase = await prisma.attachment.findFirst({
      where: { id: attachment1.id.toString() },
    })
    expect(attachmentOnDatabase?.packageItemId).toEqual(packageItemId)
    expect(packageItemOnDatabase?.status).toEqual('DELIVERED')
    await waitFor(async () => {
      const emailOnDatabase = await prisma.email.findFirst()
      expect(emailOnDatabase).not.toBe(null)
    })
  })
})
