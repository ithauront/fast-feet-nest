import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { PackageItemFactory } from 'test/factories/make-package-item'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Get package item by Id (e2e)', () => {
  let app: INestApplication
  let jwt: JwtService
  let adminFactory: AdminFactory
  let recipientFactory: RecipientFactory
  let packageItemFactory: PackageItemFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, RecipientFactory, PackageItemFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    adminFactory = moduleRef.get(AdminFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    packageItemFactory = moduleRef.get(PackageItemFactory)

    await app.init()
  })

  test('[get]/package_item/:packageItemId', async () => {
    const admin = await adminFactory.makePrismaAdmin()

    const token = jwt.sign({ sub: admin.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient()

    const packageItem = await packageItemFactory.makePrismaPackageItem({
      title: 'package 1',
      recipientId: recipient.id,
      deliveryAddress: '1 package street 987654',
    })

    const packageItemId = packageItem.id.toString()

    const response = await request(app.getHttpServer())
      .get(`/package_item/${packageItemId}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.packageItem).toEqual(
      expect.objectContaining({
        title: 'package 1',
        deliveryAddress: '1 package street 987654',
        recipientId: recipient.id.toString(),
      }),
    )
  })
})
