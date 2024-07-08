import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { PackageItemFactory } from 'test/factories/make-package-item'
import { PackageItemAttachmentFactory } from 'test/factories/make-package-item-attachment'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('Create package item tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let packageItemFactory: PackageItemFactory
  let recipientFactory: RecipientFactory
  let attachmentFactory: AttachmentFactory
  let packageItemAttachmentFactory: PackageItemAttachmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        PackageItemFactory,
        RecipientFactory,
        AttachmentFactory,
        PackageItemAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    packageItemFactory = moduleRef.get(PackageItemFactory)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    packageItemAttachmentFactory = moduleRef.get(PackageItemAttachmentFactory)
    recipientFactory = moduleRef.get(RecipientFactory)

    await app.init()
  })

  test('[PUT]/package_item/edit/:packageItemId', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()
    const packageItem = await packageItemFactory.makePrismaPackageItem({
      recipientId: recipient.id,
      status: PackageStatus.DELIVERED,
    })
    const attachment1 = await attachmentFactory.makePrismaAttachment({}, true)

    const attachment2 = await attachmentFactory.makePrismaAttachment({}, false)
    const attachment3 = await attachmentFactory.makePrismaAttachment({}, false)

    await packageItemAttachmentFactory.makePrismaPackageItemAttachment({
      attachmentId: attachment1.id,
      packageItemId: packageItem.id,
    })

    await packageItemAttachmentFactory.makePrismaPackageItemAttachment({
      attachmentId: attachment2.id,
      packageItemId: packageItem.id,
    })

    const response = await request(app.getHttpServer())
      .put(`/package_item/edit/${packageItem.id.toString()}`)
      .send({
        attachmentIds: [attachment1.id.toString(), attachment3.id.toString()],
      })

    expect(response.statusCode).toBe(200)

    expect(response.body.message).toEqual(
      `Package Item ${packageItem.title}, attachments has been edited`,
    )

    const attachmentOnDatabase = await prisma.attachment.findMany({
      where: {
        packageItemId: packageItem.id.toString(),
      },
    })
    expect(attachmentOnDatabase).toHaveLength(2)
    expect(attachmentOnDatabase).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: attachment1.id.toString() }),
        expect.objectContaining({ id: attachment3.id.toString() }),
      ]),
    )
  })
})
