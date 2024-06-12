import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/pipes/zod-validation-pipe'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { z } from 'zod'

const pageQueryParamsSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema)

type PageParamsTypeSchema = z.infer<typeof pageQueryParamsSchema>

// controller ainda sem o autoriaztion service então não esta apenas para admin ainda
@Controller('/package_item')
@UseGuards(JwtAuthGuard)
export class ListAllPackageItemsToAdminController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageParamsTypeSchema) {
    const perPage = 20
    const packageItems = await this.prisma.packageItem.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: { createdAt: 'desc' },
    })
    return packageItems
  }
}
