import { DomainEvents } from '@/core/events/domain-events'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CourierFactory } from 'test/factories/make-courier'
import { PackageItemFactory } from 'test/factories/make-package-item'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('(log) On packageItem status change tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let courierFactory: CourierFactory
  let packageItemFactory: PackageItemFactory
  let recipientFactory: RecipientFactory
  let jwt: JwtService

  let token: string
  let packageItemId: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CourierFactory, PackageItemFactory, RecipientFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    packageItemFactory = moduleRef.get(PackageItemFactory)
    courierFactory = moduleRef.get(CourierFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
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

  test('if log is created when change status of packageItem', async () => {
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
    const logOnDatabase = await prisma.logEntry.findFirst({
      where: { packageItemId },
    })
    expect(logOnDatabase?.previousState).toEqual('AWAITING_PICKUP')
    expect(logOnDatabase?.newState).toEqual('IN_TRANSIT')
  })
})
