import { Body, ConflictException, Controller, Post, UsePipes } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { hash } from "bcryptjs";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";

const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    cpf: z.string(),
    password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/users/admin')
export class CreateAdminController {
    constructor(private prisma: PrismaService) { }
    @Post()
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: CreateAccountBodySchema) {
        const { name, email, cpf, password } = body

        const adminWithSameEmail = await this.prisma.admin.findUnique({
            where: { email }
        })
        if (adminWithSameEmail) {
            throw new ConflictException('A admin with this email already exists.');
        }

        const hashedPassword = await hash(password, 8)

        await this.prisma.admin.create({
            data: {
                name,
                email,
                cpf,
                password: hashedPassword,
            }
        })
    }
}