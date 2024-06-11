import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { fakeCPFGenerator } from 'test/utils/fake-cpf-generator'

describe('Create courier tests (e2e)', () => {
    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        }).compile()

        app = moduleRef.createNestApplication()
        prisma = moduleRef.get(PrismaService)

        await app.init()
    })

    test('[POST]/users/courier', async () => {
        const cpf = fakeCPFGenerator()

        const response = await request(app.getHttpServer()).post('/users/courier').send({
            name: 'Jhon Doe',
            cpf,
            email: 'jhon@doe.com',
            password: '123456',
            phone: "2345678"

        })

        expect(response.statusCode).toBe(201)

        const userOnDatabase = await prisma.courier.findUnique({
            where: { email: 'jhon@doe.com' }
        })

        expect(userOnDatabase).toBeTruthy()
    })
})