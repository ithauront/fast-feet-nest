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
    phone: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional()

})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/users/courier')
export class CreateCourierController {
    constructor(private prisma: PrismaService) { }
    @Post()
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async handle(@Body() body: CreateAccountBodySchema) {
        const { name, email, cpf, password, phone, latitude, longitude } = body

        const courierWithSameEmail = await this.prisma.courier.findUnique({
            where: { email }
        })
        if (courierWithSameEmail) {
            throw new ConflictException('A courier with this email already exists.');
        }

        const hashedPassword = await hash(password, 8)

        await this.prisma.courier.create({
            data: {
                name,
                email,
                cpf,
                password: hashedPassword,
                phone,
                latitude: latitude ?? null,
                longitude: longitude ?? null
            }
        })
    }
}