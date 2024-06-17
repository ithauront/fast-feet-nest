import { QueryParams } from '@/core/repositories/query-params'
import { AdminRepository } from '@/domain/delivery/application/repositories/admin-repository'
import { Admin } from '@/domain/delivery/enterprise/entities/admin'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaAdminMapper } from '../mappers/prisma-admin-mapper'

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  constructor(private prisma: PrismaService) {}

  async create(admin: Admin): Promise<void> {
    const data = PrismaAdminMapper.toPrisma(admin)
    await this.prisma.admin.create({ data })
  }

  async findById(adminId: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    })
    if (!admin) {
      return null
    }
    return PrismaAdminMapper.toDomain(admin)
  }

  async findByEmail(email: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({
      where: { email },
    })
    if (!admin) {
      return null
    }
    return PrismaAdminMapper.toDomain(admin)
  }

  async findByCpf(cpf: string): Promise<Admin | null> {
    const admin = await this.prisma.admin.findUnique({
      where: { cpf },
    })
    if (!admin) {
      return null
    }
    return PrismaAdminMapper.toDomain(admin)
  }

  async save(admin: Admin): Promise<void> {
    const data = PrismaAdminMapper.toPrisma(admin)
    await this.prisma.admin.update({ where: { id: data.id }, data })
  }

  async findMany({ page }: QueryParams): Promise<Admin[]> {
    const admins = await this.prisma.admin.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return admins.map(PrismaAdminMapper.toDomain)
  }
}
