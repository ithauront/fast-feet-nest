import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'

describe('upload attachment - tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [],
    }).compile()

    prisma = moduleRef.get(PrismaService)
    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST]/attachment', async () => {
    const response = await request(app.getHttpServer())
      .post('/attachment')
      .attach('file', './test/e2e/sample-upload.pdf')

    expect(response.statusCode).toBe(201)
    const attachmentOnDatabase = await prisma.attachment.findFirst()
    expect(attachmentOnDatabase).toBeTruthy()
    expect(response.body).toEqual({
      attachmentId: expect.any(String),
    })
  })
})
