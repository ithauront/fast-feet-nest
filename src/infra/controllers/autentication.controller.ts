import { Body, Controller, Post, UnauthorizedException, UsePipes } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';
import { PrismaService } from '../prisma/prisma.service';
import { z } from 'zod';
import { Admin, Courier } from '@prisma/client';
import { compare } from 'bcryptjs';


const autenticateBodySchema = z.object({
    cpf: z.string(),
    password: z.string(),
})

type AutenticateBodySchema = z.infer<typeof autenticateBodySchema>

@Controller('/sessions')
export class AutenticateController {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
    ) { }

    @Post()
    @UsePipes(new ZodValidationPipe(autenticateBodySchema))

    async handle(@Body() body: AutenticateBodySchema) {

        const { cpf, password } = body

        let user: Admin | Courier | null = await this.prisma.admin.findUnique({
            where: { cpf }
        })
        if (!user) {
            user = await this.prisma.courier.findUnique({
                where: { cpf }
            })
        }
        if (!user) {
            throw new UnauthorizedException('User credentials do not match')
        }

        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('User credentials do not match')
        }

        const accessToken = this.jwt.sign({
            sub: user.id
        })
        return { access_token: accessToken }
    }
}
