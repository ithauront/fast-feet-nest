import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { CourierFactory } from 'test/factories/make-courier'
import { PackageItemFactory } from 'test/factories/make-package-item'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Assing package item to courier tests (e2e)', () => {
  let app: INestApplication

  let jwt: JwtService
  let recipientFactory: RecipientFactory
  let packageItemFactory: PackageItemFactory
  let courierFactory: CourierFactory
  let adminFactory: AdminFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory, PackageItemFactory, CourierFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    recipientFactory = moduleRef.get(RecipientFactory)
    packageItemFactory = moduleRef.get(PackageItemFactory)
    courierFactory = moduleRef.get(CourierFactory)
    adminFactory = moduleRef.get(AdminFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[put]/package_item/assign/:packageItemId/:courierId', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()
    const admin = await adminFactory.makePrismaAdmin()
    const courier = await courierFactory.makePrismaCourier()
    const token = jwt.sign({ sub: admin.id.toString() })

    const packageItem = await packageItemFactory.makePrismaPackageItem({
      title: 'package 1',
      recipientId: recipient.id,
    })

    const url = `/package_item/assign/${packageItem.id.toString()}/${courier.id.toString()}`

    const response = await request(app.getHttpServer())
      .put(url)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual(
      `Package Item ${packageItem.title}, is assigned to courier of id: ${courier.id.toString()}`,
    )
  })
})
