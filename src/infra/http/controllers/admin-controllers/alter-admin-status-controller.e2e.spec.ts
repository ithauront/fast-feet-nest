import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AdminFactory } from 'test/factories/make-admin'

describe('Alter package item status tests (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let adminFactory: AdminFactory

  let token: string
  let adminToModifyId: string

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    adminFactory = moduleRef.get(AdminFactory)

    await app.init()

    const admin = await adminFactory.makePrismaAdmin()

    token = jwt.sign({ sub: admin.id.toString() })

    const adminToModify = await adminFactory.makePrismaAdmin()
    adminToModifyId = adminToModify.id.toString()
  })

  test('[put]/user/admin/:adminId/status - Inactive', async () => {
    const response = await request(app.getHttpServer())
      .put(`/user/admin/${adminToModifyId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: false,
      })

    expect(response.statusCode).toBe(200)
    const adminOnDatabase = await prisma.admin.findFirst({
      where: { id: adminToModifyId },
    })
    expect(adminOnDatabase?.isActive).toEqual(false)
  })

  test('[put]//user/admin/:adminId/status - Active', async () => {
    const response = await request(app.getHttpServer())
      .put(`/user/admin/${adminToModifyId}/status`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: true,
      })

    expect(response.statusCode).toBe(200)
    const adminOnDatabase = await prisma.admin.findFirst({
      where: { id: adminToModifyId },
    })
    expect(adminOnDatabase?.isActive).toEqual(true)
  })
})
