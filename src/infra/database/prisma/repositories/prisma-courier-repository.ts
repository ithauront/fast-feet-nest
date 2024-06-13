import { QueryParams } from '@/core/repositories/query-params'
import { CourierRepository } from '@/domain/delivery/application/repositories/courier-repository'
import { Courier } from '@/domain/delivery/enterprise/entities/courier'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaCourierRepository implements CourierRepository {
  constructor(private prisma: PrismaService) {}

  create(courier: Courier): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findById(courierId: string): Promise<Courier | null> {
    throw new Error('Method not implemented.')
  }

  findByEmail(email: string): Promise<Courier | null> {
    throw new Error('Method not implemented.')
  }

  findByCpf(cpf: string): Promise<Courier | null> {
    throw new Error('Method not implemented.')
  }

  save(courier: Courier): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findMany(params: QueryParams): Promise<Courier[]> {
    throw new Error('Method not implemented.')
  }
}
