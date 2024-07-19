import { PackageItemRepository } from '@/domain/delivery/application/repositories/package-item-repository'
import { PackageStatus } from '@/domain/delivery/enterprise/entities/package-item'
import { AppModule } from '@/infra/app.module'
import { CacheRepository } from '@/infra/cache/cache-repository'
import { CacheModule } from '@/infra/cache/cache.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AdminFactory } from 'test/factories/make-admin'
import { AttachmentFactory } from 'test/factories/make-attachment'
import { PackageItemFactory } from 'test/factories/make-package-item'
import { PackageItemAttachmentFactory } from 'test/factories/make-package-item-attachment'
import { RecipientFactory } from 'test/factories/make-recipient'

describe('prisma test repository (e2e)', async () => {
  let app: INestApplication
  let recipientFactory: RecipientFactory
  let packageItemFactory: PackageItemFactory
  let cacheRepository: CacheRepository
  let attachmentFactory: AttachmentFactory
  let packageItemAttachmentFactory: PackageItemAttachmentFactory
  let packageItemRepository: PackageItemRepository

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CacheModule],
      providers: [
        AdminFactory,
        RecipientFactory,
        PackageItemFactory,
        AttachmentFactory,
        PackageItemAttachmentFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    recipientFactory = moduleRef.get(RecipientFactory)
    packageItemFactory = moduleRef.get(PackageItemFactory)
    cacheRepository = moduleRef.get(CacheRepository)
    attachmentFactory = moduleRef.get(AttachmentFactory)
    packageItemAttachmentFactory = moduleRef.get(PackageItemAttachmentFactory)
    packageItemRepository = moduleRef.get(PackageItemRepository)

    await app.init()
  })

  test('if can cache packageItem on findDetailsByID', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()
    const attachment1 = await attachmentFactory.makePrismaAttachment({}, true)

    const packageItem = await packageItemFactory.makePrismaPackageItem({
      title: 'package 1',
      recipientId: recipient.id,
      deliveryAddress: '1 package street 987654',
    })

    await packageItemAttachmentFactory.makePrismaPackageItemAttachment({
      packageItemId: packageItem.id,
      attachmentId: attachment1.id,
    })
    const packageItemId = packageItem.id.toString()

    const packageItemDetails =
      await packageItemRepository.findPackageItemWithDetailsById(packageItemId)
    const cached = await cacheRepository.get(
      `packageItem:${packageItemId}:details`,
    )

    expect(cached).toEqual(JSON.stringify(packageItemDetails))
  })

  test('if can cache packageItem on find many by params and courierID', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()
    const attachment1 = await attachmentFactory.makePrismaAttachment({}, true)

    for (let i = 1; i <= 4; i++) {
      const packageItem = await packageItemFactory.makePrismaPackageItem({
        title: `package ${i}`,
        recipientId: recipient.id,
        deliveryAddress: `package street 987654`,
        status: PackageStatus.IN_TRANSIT,
      })

      await packageItemAttachmentFactory.makePrismaPackageItemAttachment({
        packageItemId: packageItem.id,
        attachmentId: attachment1.id,
      })
    }
    const queryParams = {
      page: 1,
      status: PackageStatus.IN_TRANSIT,
      address: 'package street 987654',
    }

    const packageItemDetails =
      await packageItemRepository.findManyByParamsAndCourierId(
        queryParams,
        null,
      )

    const cacheKey = `packageItems:page=${queryParams.page}-status=${queryParams.status}-address=${queryParams.address}-courierId=any`

    const cached = await cacheRepository.get(cacheKey)

    expect(cached).toEqual(JSON.stringify(packageItemDetails))
  })

  test('if can cache packageItem on find many by params', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()
    const attachment1 = await attachmentFactory.makePrismaAttachment({}, true)

    for (let i = 1; i <= 4; i++) {
      const packageItem = await packageItemFactory.makePrismaPackageItem({
        title: `package ${i}`,
        recipientId: recipient.id,
        deliveryAddress: `package street 987654`,
        status: PackageStatus.IN_TRANSIT,
      })

      await packageItemAttachmentFactory.makePrismaPackageItemAttachment({
        packageItemId: packageItem.id,
        attachmentId: attachment1.id,
      })
    }
    const queryParams = {
      page: 1,
      status: PackageStatus.IN_TRANSIT,
      address: 'package street 987654',
    }

    const packageItemDetails =
      await packageItemRepository.findManyByParams(queryParams)

    const cacheKey = `packageItems:page=${queryParams.page}-status=${queryParams.status}-address=${queryParams.address}`

    const cached = await cacheRepository.get(cacheKey)

    expect(cached).toEqual(JSON.stringify(packageItemDetails))
  })
  test('if can flush all cache when save', async () => {
    const recipient = await recipientFactory.makePrismaRecipient()
    const attachment1 = await attachmentFactory.makePrismaAttachment({}, true)

    for (let i = 1; i <= 4; i++) {
      const packageItem = await packageItemFactory.makePrismaPackageItem({
        title: `package ${i}`,
        recipientId: recipient.id,
        deliveryAddress: `package street 987654`,
        status: PackageStatus.IN_TRANSIT,
      })

      await packageItemAttachmentFactory.makePrismaPackageItemAttachment({
        packageItemId: packageItem.id,
        attachmentId: attachment1.id,
      })
    }
    const queryParams = {
      page: 1,
      status: PackageStatus.IN_TRANSIT,
      address: 'package street 987654',
    }

    const packageItemDetails =
      await packageItemRepository.findManyByParams(queryParams)

    const cacheKey = `packageItems:page=${queryParams.page}-status=${queryParams.status}-address=${queryParams.address}`

    const cached = await cacheRepository.get(cacheKey)

    expect(cached).toEqual(JSON.stringify(packageItemDetails))

    const packageItemToUpdate = await packageItemFactory.makePrismaPackageItem({
      title: 'Updated Package',
      recipientId: recipient.id,
      deliveryAddress: 'updated address 123',
      status: PackageStatus.DELIVERED,
    })

    await packageItemRepository.save(packageItemToUpdate)
    const cacheAfterSave = await cacheRepository.get(cacheKey)
    expect(cacheAfterSave).toEqual(null)
  })
})
