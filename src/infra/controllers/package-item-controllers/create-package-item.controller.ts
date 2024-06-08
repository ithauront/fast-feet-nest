import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { JwtAuthGuard } from "@/infra/auth/jwt-auth.guard";
import type { Request } from "express";
import { CurentUser } from "@/infra/auth/current-user-decorator";
import { UserPayload } from "@/infra/auth/jwt.strategy";

@Controller('/package_item')
@UseGuards(JwtAuthGuard)
export class CreatePackageItemController {
    constructor(private prisma: PrismaService,
        private jwt: JwtService
    ) { }

    @Post()
    async handle(@CurentUser() user: UserPayload) {
        console.log(user)
    }
}