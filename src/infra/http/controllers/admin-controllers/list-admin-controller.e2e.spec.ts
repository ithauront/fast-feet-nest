import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'

describe('list all admin tests (e2e)', () => {
  let app: INestApplication

  let jwt: JwtService
  let adminFactory: AdminFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    adminFactory = moduleRef.get(AdminFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[get]/user/admin', async () => {
    const creator = await adminFactory.makePrismaAdmin()

    const token = jwt.sign({ sub: creator.id.toString() })

    await adminFactory.makePrismaAdmin({
      name: 'admin 1',
    })
    await adminFactory.makePrismaAdmin({
      name: 'admin 2',
    })

    await adminFactory.makePrismaAdmin({
      name: 'admin 3',
    })
    await adminFactory.makePrismaAdmin({
      name: 'admin 4',
    })

    const response = await request(app.getHttpServer())
      .get('/user/admin')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        admins: expect.arrayContaining([
          expect.objectContaining({ name: 'admin 1' }),
          expect.objectContaining({ name: 'admin 2' }),
          expect.objectContaining({ name: 'admin 3' }),
          expect.objectContaining({ name: 'admin 4' }),
        ]),
      }),
    )
  })
})
