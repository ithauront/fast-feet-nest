import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'
import { PackageItemFactory } from 'test/factories/make-package-item'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('list in transit package item to admin tests (e2e)', () => {
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
    adminFactory = moduleRef.get(AdminFactory)
    recipientFactory = moduleRef.get(RecipientFactory)
    packageItemFactory = moduleRef.get(PackageItemFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/package_item/list/in_transit', async () => {
    const admin = await adminFactory.makePrismaAdmin()

    const token = jwt.sign({ sub: admin.id.toString() })

    const recipient = await recipientFactory.makePrismaRecipient()

    await packageItemFactory.makePrismaPackageItem({
      title: 'package 1',
      recipientId: recipient.id,
      status: PackageStatus.IN_TRANSIT,
    })
    await packageItemFactory.makePrismaPackageItem({
      title: 'package 2',
      recipientId: recipient.id,
      status: PackageStatus.IN_TRANSIT,
    })

    await packageItemFactory.makePrismaPackageItem({
      title: 'package 3',
      recipientId: recipient.id,
      status: PackageStatus.IN_TRANSIT,
    })
    await packageItemFactory.makePrismaPackageItem({
      title: 'package 4',
      recipientId: recipient.id,
    })

    const response = await request(app.getHttpServer())
      .get('/package_item/list/in_transit')
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
