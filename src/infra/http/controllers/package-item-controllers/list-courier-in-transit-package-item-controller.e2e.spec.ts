import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CourierFactory } from 'test/factories/make-courier'
import { PackageItemFactory } from 'test/factories/make-package-item'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('list in transit package item to courier tests (e2e)', () => {
  let app: INestApplication

  let jwt: JwtService
  let recipientFactory: RecipientFactory
  let packageItemFactory: PackageItemFactory
  let courierFactory: CourierFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory, PackageItemFactory, CourierFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    recipientFactory = moduleRef.get(RecipientFactory)
    packageItemFactory = moduleRef.get(PackageItemFactory)
    courierFactory = moduleRef.get(CourierFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/package_item/:courierId/list/in_transit', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()

    const courier = await courierFactory.makePrismaCourier()
    const token = jwt.sign({ sub: courier.id.toString() })

    await packageItemFactory.makePrismaPackageItem({
      title: 'package 1',
      recipientId: recipient.id,
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    await packageItemFactory.makePrismaPackageItem({
      title: 'package 2',
      recipientId: recipient.id,
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })

    await packageItemFactory.makePrismaPackageItem({
      title: 'package 3',
      recipientId: recipient.id,
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
    })
    await packageItemFactory.makePrismaPackageItem({
      title: 'package 4',
      recipientId: recipient.id,
      courierId: courier.id,
    })
    const url = `/package_item/${courier.id.toString()}/list/in_transit`

    const response = await request(app.getHttpServer())
      .get(url)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        packageItems: expect.arrayContaining([
          expect.objectContaining({ title: 'package 1' }),
          expect.objectContaining({ title: 'package 2' }),
          expect.objectContaining({ title: 'package 3' }),
        ]),
      }),
    )
  })
})
