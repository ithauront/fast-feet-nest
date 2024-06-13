import { QueryParams } from '@/core/repositories/query-params'
import { AdminRepository } from '@/domain/delivery/application/repositories/admin-repository'
import { Admin } from '@/domain/delivery/enterprise/entities/admin'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaAdminRepository implements AdminRepository {
  constructor(private prisma: PrismaService) {}

  create(admin: Admin): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(packageId: string): Promise<Admin | null> {
    throw new Error('Method not implemented.')
  }

  findByEmail(email: string): Promise<Admin | null> {
    throw new Error('Method not implemented.')
  }

  findByCpf(cpf: string): Promise<Admin | null> {
    throw new Error('Method not implemented.')
  }

  save(admin: Admin): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findMany(params: QueryParams): Promise<Admin[]> {
    throw new Error('Method not implemented.')
  }
}
