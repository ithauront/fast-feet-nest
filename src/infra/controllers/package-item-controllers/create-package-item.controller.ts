import { BadRequestException, Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth.guard";
import type { Request } from "express";
import { CurentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";
import { z } from "zod";
import { ZodValidationPipe } from "@/infra/pipes/zod-validation-pipe";

const PackageStatusEnum = z.enum([
    "AWAITING_PICKUP",
    "IN_TRANSIT",
    "DELIVERED",
    "RETURNED",
    "LOST"
]);

const createPackageItemBodySchema = z.object({
    title: z.string(),
    deliveryAddress: z.string(),
    courierId: z.string().optional(),
    recipientId: z.string(),
    status: PackageStatusEnum.default("AWAITING_PICKUP")
})

const bodyValidationPipe = new ZodValidationPipe(createPackageItemBodySchema)

type CreatePackageItemBodySchema = z.infer<typeof createPackageItemBodySchema>

@Controller('/package_item')
@UseGuards(JwtAuthGuard)
export class CreatePackageItemController {
    constructor(private prisma: PrismaService,
        private jwt: JwtService
    ) { }

    @Post()
    async handle(
        @CurentUser() user: UserPayload,
        @Body(bodyValidationPipe) body: CreatePackageItemBodySchema
    ) {
        const { title, deliveryAddress, courierId, recipientId, status } = body
        //  const authorId = user.sub quando integrarmos com o useCase vamos usar isso para passar o authorId
        const recipientExists = await this.prisma.recipient.findUnique({
            where: { id: recipientId }
        })

        if (!recipientExists) {
            throw new BadRequestException('Recipient does not exist.');
        }
        await this.prisma.packageItem.create({
            data: {
                title, deliveryAddress, courierId, recipientId, status
            }
        })
    }
}