// This test does not use mocks. By doing this, we can verify if the external services used for geolocation are operational. However, this approach makes the test susceptible to failures caused by issues in these external services. In case of test failure, it is advisable to check the status and responsiveness of these services.

import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import { GeoLocation } from '@/domain/delivery/enterprise/entities/value-object/geolocation'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CourierFactory } from 'test/factories/make-courier'
import { PackageItemFactory } from 'test/factories/make-package-item'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('list package item near courier tests (e2e)', () => {
  let app: INestApplication

  let jwt: JwtService
  let courierFactory: CourierFactory
  let recipientFactory: RecipientFactory
  let packageItemFactory: PackageItemFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CourierFactory, RecipientFactory, PackageItemFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    courierFactory = moduleRef.get(CourierFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    packageItemFactory = moduleRef.get(PackageItemFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/package_item/:courierId/list/near', async () => {
    const courier = await courierFactory.makePrismaCourier({
      location: new GeoLocation(-23.55052, -46.633308),
    })

    const token = jwt.sign({ sub: courier.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient()

    await packageItemFactory.makePrismaPackageItem({
      title: 'package 1',
      recipientId: recipient.id,
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
      deliveryAddress: 'Rua Augusta, São Paulo - SP, Brasil', // near location
    })
    await packageItemFactory.makePrismaPackageItem({
      title: 'package 2',
      recipientId: recipient.id,
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
      deliveryAddress: 'Avenida Paulista, São Paulo - SP, Brasil', // near location
    })

    await packageItemFactory.makePrismaPackageItem({
      title: 'package 3',
      recipientId: recipient.id,
      status: PackageStatus.IN_TRANSIT,
      courierId: courier.id,
      deliveryAddress: 'Avenida Ragueb Chohfi, São Paulo - SP, Brasil', // far location
    })
    await packageItemFactory.makePrismaPackageItem({
      title: 'package 4',
      recipientId: recipient.id,
      courierId: courier.id,
      status: PackageStatus.AWAITING_PICKUP, // is not inTransit should not list
    })

    const response = await request(app.getHttpServer())
      .get(`/package_item/${courier.id.toString()}/list/near`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        packageItems: expect.arrayContaining([
          expect.objectContaining({ title: 'package 1' }),
          expect.objectContaining({ title: 'package 2' }),
        ]),
      }),
    )
  })
})
